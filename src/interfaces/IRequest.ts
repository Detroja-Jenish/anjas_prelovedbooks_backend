import { Request } from "express"

export interface IRequest<T> extends Request {
    body: {
        JWTData: {
            userId?: number,
            cartId: number,
            anonymousUserId: number
        }
    } & {
        data: T
    }
}