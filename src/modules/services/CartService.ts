import { NextFunction } from "express";
import { IRequest } from "../../interfaces/IRequest";
import { IResponse } from "../../interfaces/IResponse";
import errorMessages from "../../utils/errorMessages";
import { BookController } from "../controller/BookController";
import { CartController } from "../controller/CartController";
import { BookPartial } from "../typees/bookTypes";
import { AddRemoveBookResponse, AddRemoveBookType, CartGetByIdResponseType } from "../typees/cartTypes";
import { OrderController } from "../controller/OrderController";

export class CartService {
    static getById = async (req: IRequest<{}>, res: IResponse<CartGetByIdResponseType>) => {
        const { cartId } = req.body.JWTData
        const cart = await CartController.getById(cartId)
        return res.send(cart)
    }

    static addBook = async (req: IRequest<AddRemoveBookType>, res: IResponse<AddRemoveBookResponse>, next: NextFunction) => {
        try {
            const { JWTData: { cartId }, data: { bookId } } = req.body
            console.log(req.body.data);

            const book = await BookController.reserveBook(bookId, 10)

            const cart = await CartController.addBook(book, cartId)

            // if (cart.order) {
            //     await OrderController.cancel(cart.order.id)
            // }
            // cart.order = null!
            // await CartController.save(cart)
            return res.send({ totalAmount: cart.totalAmount, book: book as BookPartial })
        } catch (error) {
            console.log("error---service", error);

            next(error)
        }
    }
    static removeBook = async (req: IRequest<AddRemoveBookType>, res: IResponse<AddRemoveBookResponse>, next: NextFunction) => {
        try {
            const { JWTData: { cartId }, data: { bookId } } = req.body
            const book = await BookController.bookGetById(bookId)
            const cart = await CartController.getById(cartId)
            if (cart.order) {
                await OrderController.cancel(cart.order.id)
            }
            await CartController.removeBook(book, cart)
            cart.order = null!
            await CartController.save(cart)
            return res.send({ totalAmount: cart.totalAmount, book: book as BookPartial })
        } catch (error) {
            next(error)
        }
    }

}