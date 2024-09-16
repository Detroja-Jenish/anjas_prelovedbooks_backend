import { NextFunction, Response, Request } from "express";
import { ErrorMessage } from "../utils/errorMessages";

export default (error: ErrorMessage, req: Request, res: Response, next: NextFunction) => {
    console.log("here");

    return res.status(error.status).send({ errorMessage: error.errorMessage })
}