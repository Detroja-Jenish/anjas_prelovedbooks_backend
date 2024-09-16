import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AppDataSource from "./AppDataSource";
import adminRouter from "./modules/routes/adminRoutes";
import errorHandler from "./middlewares/errorHandler";
import adminAuthMiddleware from "./middlewares/adminAuthMiddleware";
import { simulateSlowSpeed } from "./middlewares/simulateSlowspeed";
import clientAuthMiddleware from "./middlewares/clientAuthMiddleware";
import clientRouter from "./modules/routes/clientRoutes";
import { AnonymousUser } from "./entities/AnonymousUser";
import { Cart } from "./entities/Cart";
import * as jwt from "jsonwebtoken";
import { User } from "./entities/User";

const app = express()
AppDataSource.initialize().then(() => {
    app.get("/", (req, res) => {
        res.send("Vande Mataram")
    })
    app.use(cors())
    app.use(bodyParser.json())
    app.post("/client/anonymousUser", async (req, res) => {
        console.log("anonymousUser created");

        const anonymousUser = new AnonymousUser()
        const cart = new Cart()
        anonymousUser.cart = cart
        anonymousUser.cart.books = []
        anonymousUser.cart.totalAmount = 0
        await AppDataSource.getRepository(AnonymousUser).save(anonymousUser)

        return res.status(200).send({ anonymousUser, serviceToken: jwt.sign({ anonymousUserId: anonymousUser.id, cartId: anonymousUser.cart.id, address: anonymousUser.address }, "9925") })
    })
    app.get("/client/info", clientAuthMiddleware, async (req, res) => {
        if (req.body.JWTData.userId) {
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: req.body.JWTData.userId }
                , relations: {
                    cart: true,
                    address: true
                }
            })
            if (!user) return res.status(404).send({ errorMsg: "user not found" })
            return res.send({ user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, cartId: user.cart.id, address: user.address } })
        }
        if (req.body.JWTData.anonymousUserId) {
            const anonymousUser = await AppDataSource.getRepository(AnonymousUser).findOne({
                where: { id: req.body.JWTData.anonymousUserId }
                , relations: {
                    cart: true,
                    address: true
                }
            })
            if (!anonymousUser) return res.status(404).send({ errorMsg: "user not found" })
            return res.send({ anonymousUser: { id: anonymousUser.id, cartId: anonymousUser.cart.id, address: anonymousUser.address } })
        }
    })

    app.use("/admin", adminAuthMiddleware, adminRouter)
    app.use("/client", clientAuthMiddleware, clientRouter)
    app.use(errorHandler)
    app.listen(3000, "0.0.0.0", () => {
        console.log("server started");
    })
}).catch((e) => {

    console.log("error occured", e);

})
//admin
//jenish1704