import { getSystemErrorMap } from "util"
import AppDataSource from "../../AppDataSource"
import { Order, OrderStatus } from "../../entities/Order"
import errorMessages from "../../utils/errorMessages"
import { OrderCreateType } from "../typees/orderType"
import { BookController } from "./BookController"

export class OrderController {
    static orderRepository = AppDataSource.getRepository(Order)
    static save = async (order: Order) => {
        await this.orderRepository.save(order)
    }

    static create = async ({ totalAmount, user, anonymousUser, books, address, payment }: OrderCreateType) => {
        try {
            const order = new Order()
            order.totalAmount = totalAmount
            order.user = user
            order.anonymousUser = anonymousUser
            order.books = books
            order.status = OrderStatus.CREATED
            order.address = address
            order.payment = payment
            await this.orderRepository.save(order)
            return order
        } catch (error) {
            throw errorMessages.orderNotCreated
        }
    }

    static getById = async (orderId: number) => {
        console.log("starting");

        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: {
                user: true,
                anonymousUser: true,
                address: true,
                books: true,
                payment: true
            }
        })
        console.log("hello");

        if (!order) throw errorMessages.orderNotFound
        console.log("order will return soon", order)
        return order

    }

    static cancel = async (orderId: number) => {
        try {
            const order = await this.getById(orderId)
            console.log("order got for cancelation");

            await BookController.markAvailable(order.books)
            order.status = OrderStatus.CANCELLED
            await this.orderRepository.save(order)
            return order
        } catch (error) {
            throw error
        }
    }
}