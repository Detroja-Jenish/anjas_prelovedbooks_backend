import { NextFunction, Response, Request } from "express";

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(() => {
        console.log("sleep");
        resolve(ms)
    }, ms))
}

export const simulateSlowSpeed = async (req: Request, res: Response, next: NextFunction) => {
    await sleep(1000)
    next()
}