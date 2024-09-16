import { NextFunction } from "express";
import { Category } from "../../entities/Category";
import { IRequest } from "../../interfaces/IRequest";
import { IResponse } from "../../interfaces/IResponse";
import errorMessages from "../../utils/errorMessages";
import { CategoryController } from "../controller/CategoryController";

export class CategoryService {
    static create = async (req: IRequest<{ categoryName: string, parentId: string | null | undefined }>, res: IResponse<Category>) => {
        const { categoryName, parentId } = req.body.data
        console.log(req.body);

        const category = await CategoryController.create(categoryName, parentId)
        res.send(category)
    }

    static getAllSubCategoryOnly = async (req: IRequest<{}>, res: IResponse<Category[]>) => {
        return res.send(await CategoryController.getAllSubCategoryOnly())
    }
    static getAll = async (req: IRequest<{}>, res: IResponse<Category[]>, next: NextFunction) => {

        return res.send(await CategoryController.getAll())
    }
}