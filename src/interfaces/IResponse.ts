import { Response } from "express"

export interface IResponse<T> extends Response {
    send(data: T): this
}