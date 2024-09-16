import { Request, Response } from "express";
import { IRequest } from "../../interfaces/IRequest";
import { BookCreate, PaginationData, PaginationParams } from "../typees/bookTypes";
import { BookController } from "../controller/BookController";
import { IResponse } from "../../interfaces/IResponse";
import { Book } from "../../entities/Book";
import IDelete from "../../interfaces/IDelete";
import { IFile } from "../typees/awsType";
import { AWSController } from "../controller/AWSController";
import fs from "fs"
import * as path from "path"
import fileUpload from 'express-fileupload';
import { GeminiController } from "../controller/GeminiController";

export class BookService {
    static create = async (req: IRequest<BookCreate>, res: IResponse<Book>) => {
        console.log(req.body.data);
        (req.body.data)
        const book = await BookController.create(req.body.data)
        return res.send(book)
    }

    static clientGetAll = async (req: IRequest<PaginationParams>, res: IResponse<PaginationData>) => {
        const { books, meta } = await BookController.pagination(req.body.data)
        return res.send({
            books,
            meta
        })
    }

    static delete = async (req: IRequest<IDelete>, res: Response) => {
        const { id } = req.body.data
        const book = await BookController.bookGetById(id)

        await AWSController.deleteObjects([book.coverImage])
        if (book.images.length > 0) {
            await AWSController.deleteObjects(book.images.map(bookImage => bookImage.imageURL))
        }
        if (book.videos.length > 0) {
            await AWSController.deleteObjects(book.videos.map(bookVideo => bookVideo.videoURL))
        }

        await BookController.delete(book)
        return res.send(book)
    }

    static uploadImages = async (req: IRequest<{ files: IFile[] }>, res: IResponse<string[]>) => {
        const { files } = req.body.data
        const putURLs: string[] = [];
        for (let file of files) {
            const url = await AWSController.getPutObjectUrl(file)
            putURLs.push(url)
        }
        console.log(putURLs);

        return res.send(putURLs)
    }

    static getDetailByAi = async (req: Request, res: Response) => {
        try {
            if (!req.files || !req.files.file) {
                return res.status(400).send('No file uploaded.');
            }

            const file = req.files.file as fileUpload.UploadedFile;
            const uploadPath = path.join(__dirname, '../uploads', file.name.split(" ").join("-"));

            await file.mv(uploadPath);
            console.log(uploadPath)

            const result = await GeminiController.getDetail(uploadPath, file.mimetype)

            fs.unlinkSync(uploadPath);
            console.log(result.split('\n'))
            return res.send(result);
        } catch (error) {
            if (!res.headersSent) {
                return res.status(500).send('Error processing image.');
            }
        }
    }
}
