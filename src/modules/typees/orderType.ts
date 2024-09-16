import { Address } from "../../entities/Address"
import { AnonymousUser } from "../../entities/AnonymousUser"
import { Book } from "../../entities/Book"
import { OrderStatus } from "../../entities/Order"
import { Payment } from "../../entities/Payment"
import { User } from "../../entities/User"

export type OrderCreateType = {
    totalAmount: number
    user: User
    anonymousUser: AnonymousUser
    books: Book[]
    address: Address
    payment: Payment
}

export type VerifyPaymentRequest = {
    order_id: string, payment_id: string, signature: string
}