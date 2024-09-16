import { NextFunction } from "express";
import { Address } from "../../entities/Address";
import { Order, OrderStatus } from "../../entities/Order";
import { IRequest } from "../../interfaces/IRequest";
import { IResponse } from "../../interfaces/IResponse";
import errorMessages from "../../utils/errorMessages";
import { AddressController } from "../controller/AddressController";
import { anonymousUserController } from "../controller/anonymousUserController";
import { BookController } from "../controller/BookController";
import { CartController } from "../controller/CartController";
import { OrderController } from "../controller/OrderController";
import { PaymentController } from "../controller/PaymentController";
import { RazorpayController } from "../controller/RazorpayController";
import { UserController } from "../controller/UserController";
import { VerifyPaymentRequest } from "../typees/orderType";

export class OrderService {
    static canPlaceOrder = async (req: IRequest<{}>, res: IResponse<{ canPlaceOrder: boolean, order?: Order }>) => {
        const { JWTData: { cartId } } = req.body;
        const cart = await CartController.getById(cartId)
        if (!cart.books || cart.books.length === 0) {
            throw errorMessages.emptyCart
        }
        try {
            let order: Order | undefined = undefined;
            if (cart.order) {
                order = await OrderController.getById(cart.order.id)
            } else {
                await BookController.checkAvailibilityOfBooks(cart.books)
            }
            return res.send({ canPlaceOrder: true, order })
        } catch (error) {
            throw error
        }

    }

    static place = async (req: IRequest<{ addressData: Address, orderId: number }>, res: IResponse<Order>, next: NextFunction) => {
        const { JWTData: { cartId }, data: { addressData, orderId } } = req.body;
        const cart = await CartController.getById(cartId)
        if (!cart.books || cart.books.length === 0) {
            next(errorMessages.emptyCart)
        }
        let order: Order;
        try {
            // await BookController.checkAvailibilityOfBooks(cart.books)
            await BookController.markUnavailable(cart.books)
            let address: Address | null = cart.user && cart.user.address ? cart.user.address : (cart.anonymousUser && cart.anonymousUser.address ? cart.anonymousUser.address : null)
            console.log("address 1", address);
            console.log("cart", cart);


            if (address && !AddressController.matchAddress(address, addressData)) {
                address = await AddressController.create(addressData);
                console.log("address 2", address);

            } else if (cart.user && !cart.user.address) {
                address = await AddressController.create(addressData);
                cart.user.address = address;
                await UserController.save(cart.user);
                console.log("address 3", address);

            }
            else if (cart.anonymousUser && !cart.anonymousUser.address) {
                address = await AddressController.create(addressData);
                cart.anonymousUser.address = address
                await anonymousUserController.save(cart.anonymousUser);
                console.log("address 4", address);

            }


            let razorpayOrder = null
            razorpayOrder = await RazorpayController.createOrder(cart.totalAmount)
            const payment = await PaymentController.create(razorpayOrder)

            order = await OrderController.create({
                totalAmount: cart.totalAmount,
                books: cart.books,
                user: cart.user,
                anonymousUser: cart.anonymousUser,
                address: address!,
                payment: payment
            })
            cart.order = order
            CartController.save(cart)
            // payment.id = razorPayOrder.id
            return res.send(order);
        } catch (error) {
            await BookController.markAvailable(cart.books)
            next(error)
        }
        // const order = await OrderController.getById(orderId)

    }

    static verifyPayment = async (req: IRequest<VerifyPaymentRequest>, res: IResponse<Order>, next: NextFunction) => {
        try {
            const { order_id, payment_id, signature } = req.body.data
            const { cartId } = req.body.JWTData
            const cart = await CartController.getById(cartId)
            const order = await OrderController.getById(8)
            if (await RazorpayController.verifyPayment(order_id, payment_id, signature)) {
                console.log(true);

                // await RazorpayController.capture(payment_id, order.totalAmount)
                order.status = OrderStatus.PAID
                await OrderController.save(order)
                cart.order = null!
                await CartController.save(cart)
            } else {
                order.status = OrderStatus.CANCELLED
                await OrderController.save(order)
                cart.order = null!
                await CartController.save(cart)
                throw errorMessages.paymentNotVefied
            }
            return res.send(order)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static getById = async (req: IRequest<{ orderId: number }>, res: IResponse<Order>) => {
        const { orderId } = req.body.data
        const order = await OrderController.getById(orderId)
        return res.send(order)
    }

}