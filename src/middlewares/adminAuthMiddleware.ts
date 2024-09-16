import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import errorMessages from "../utils/errorMessages";
export default (req: Request, res: Response, next: NextFunction) => {
    req.body = { data: req.body }
    next()
    // const JWTToken = req.headers.authorization
    // if (!JWTToken) throw errorMessages.missingJWTtoken
    // jwt.verify(JWTToken, process.env.JWT_SECRET!, (err, JWTData) => {
    //     if (err) throw errorMessages.invalidJWTtoken
    //     req.body.JWTData = JWTData
    //     next()
    // })
}