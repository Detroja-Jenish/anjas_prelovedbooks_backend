import { Orders } from "razorpay/dist/types/orders"
import AppDataSource from "../../AppDataSource"
import { Order } from "../../entities/Order"
import { Payment } from "../../entities/Payment"
import errorMessages from "../../utils/errorMessages"

export class PaymentController {
    static paymentRepository = AppDataSource.getRepository(Payment)
    static save = async (payment: Payment) => {
        await this.paymentRepository.save(payment)
    }

    static create = async (razorpayOrder: Orders.RazorpayOrder) => {
        try {
            const payment = new Payment()
            payment.amount = Number(razorpayOrder.amount)
            payment.razorpayOrderId = razorpayOrder.id
            payment.paymentMethod = "online"
            await this.paymentRepository.save(payment)
            return payment
        } catch (error) {
            console.log(error);

            throw errorMessages.someError
        }
    }
}