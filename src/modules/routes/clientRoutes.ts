import { Router } from "express";
import { BookService } from "../services/BookService";
import { CartService } from "../services/CartService";
import { OrderService } from "../services/OrderService";
import { CategoryService } from "../services/CategoryService";

const clientRouter = Router()
clientRouter.get("/books", BookService.clientGetAll)
clientRouter.put("/cart/addBook", CartService.addBook)
clientRouter.put("/cart/removeBook", CartService.removeBook)
clientRouter.get("/cart", CartService.getById)
clientRouter.post("/orders", OrderService.place)
clientRouter.get("/orders/canPlace", OrderService.canPlaceOrder)
clientRouter.post("/orders/getById", OrderService.getById)
clientRouter.post("/orders/verifyPayment", OrderService.verifyPayment)
clientRouter.get("/categories", CategoryService.getAll)

export default clientRouter