import { Router } from "express";
import { BookService } from "../services/BookService";
import fileUpload from "express-fileupload";
import { CategoryService } from "../services/CategoryService";

const adminRouter = Router()
adminRouter.post("/categories", CategoryService.create)
adminRouter.get("/categories", CategoryService.getAll)
adminRouter.get("/categories/getAllSubCategoryOnly", CategoryService.getAllSubCategoryOnly)
adminRouter.put("/aws", BookService.uploadImages)

adminRouter.post("/books", BookService.create)
adminRouter.post("/ai/get-book-detail", fileUpload({
    createParentPath: true // Automatically create directory structure
}), BookService.getDetailByAi)
export default adminRouter