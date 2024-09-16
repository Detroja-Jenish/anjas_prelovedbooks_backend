import { Between, DeepPartial, FindOptionsWhere, In } from "typeorm"
import { Book } from "../../entities/Book"
import { BookImage } from "../../entities/BookImage"
import { BookVideo } from "../../entities/BookVideo"
import { CategoryController } from "./CategoryController"
import AppDataSource from "../../AppDataSource"
import { BookCreate, PaginationData, PaginationParams } from "../typees/bookTypes"
import errorMessages from "../../utils/errorMessages"
import { addMinutes, isAfter } from "date-fns"

export class BookController {
    static bookRepository = AppDataSource.getRepository(Book)
    static create = async (bookData: BookCreate) => {
        const book = new Book()
        book.name = bookData.name ?? "default"
        book.author = bookData.author ?? "default"
        book.price = bookData.price ?? 0
        book.discount = bookData.discount ?? 0
        book.publisher = bookData.publisher ?? "default"
        book.description = bookData.description ?? "default"
        book.coverImage = bookData.coverImage ?? "default"
        book.images = bookData.images ? bookData.images?.map((imageURL) => {
            const temp = new BookImage()
            temp.imageURL = imageURL ?? ""
            return temp
        }) : []
        book.videos = bookData.videos ? bookData.videos?.map((videoURL) => {
            const temp = new BookVideo()
            temp.videoURL = videoURL ?? ""
            return temp
        }) : []
        const categories = await CategoryController.findByIds(bookData.categoryIds)
        book.categories = categories

        await this.bookRepository.save(book)
        return book
    }

    static bookGetById = async (id: number) => {
        const book = await this.bookRepository.findOne({
            where: { id },
            select: {
                categories: {
                    categoryName: true
                },
                images: {
                    imageURL: true
                },
                videos: {
                    videoURL: true
                }
            },
            relations: {
                categories: true,
                images: true,
                videos: true,
            }
        })
        if (!book) throw errorMessages.bookNotFound
        return book
    }

    static update = async (book: Book) => {
        try {
            return await this.bookRepository.save(book)
        } catch (error) {
            throw errorMessages.bookDidNotUpdate
        }
    }

    static delete = async (book: Book) => {
        return await this.bookRepository.remove(book)
    }

    static pagination = async ({ page = 1, limit = 12, categoryIds = [], minPrice, maxPrice }: PaginationParams): Promise<PaginationData> => {
        const pageNumber = Math.max(1, Number(page)); // Ensure page is at least 1
        const limitNumber = Math.max(1, Number(limit)); // Ensure limit is at least 1
        // Build query conditions
        const whereConditions: FindOptionsWhere<Book> = {};

        if (categoryIds!.length > 0) {
            whereConditions.categories = { id: In(categoryIds) };
        }

        if (minPrice || maxPrice) {
            whereConditions.price = Between(Number(minPrice) || 0, Number(maxPrice) || Number.MAX_VALUE);
        }

        const offset = (pageNumber - 1) * limitNumber;


        const [books, totalBooks] = await this.bookRepository.findAndCount({
            where: whereConditions,
            select: {
                id: true,
                name: true,
                price: true,
                discount: true,
                coverImage: true,
                author: true,
                isAvailable: true,
                isSoldOut: true,
            },
            skip: offset,
            take: limitNumber,
        });

        const totalPages = Math.ceil(totalBooks / limitNumber);
        return {
            books,
            meta: {
                totalBooks,
                pageNumber,
                totalPages,
                limit: limitNumber,
            },
        }
    }

    static reserveBook = async (bookId: number, reserveDuration: number) => {
        const book = await this.bookGetById(bookId)

        if (!book) {
            throw errorMessages.bookNotFound
        }
        console.log("is after", isAfter(new Date(), book.reservedUntil));

        // if (book.reservedUntil && !isAfter(new Date(), book.reservedUntil) && book.isAvailable) {
        //     throw errorMessages.bookNotAvialable(book.name)
        // }
        console.log("hello");

        book.reservedUntil = addMinutes(new Date(), reserveDuration); // Reserve for reserveDuration minutes
        await this.bookRepository.update({ reservedUntil: addMinutes(new Date(), reserveDuration) }, { id: bookId });
        console.log("bye");
        return book
    }

    static markUnavailable = async (books: Book[]) => {
        try {
            await AppDataSource.createQueryBuilder()
                .update(Book)
                .set({ isAvailable: false })
                .where("id IN (:...ids)", { ids: books.map(book => book.id) })
                .execute();
        } catch (error) {
            throw errorMessages.someError
        }
    }

    static markAvailable = async (books: Book[]) => {
        try {
            await AppDataSource.createQueryBuilder()
                .update(Book)
                .set({ isAvailable: true })
                .where("id IN (:...ids)", { ids: books.map(book => book.id) })
                .execute();
        } catch (error) {
            console.log("error form book controller :- ", error);

            throw errorMessages.someError
        }
    }

    static checkAvailibilityOfBook = async (book: Book) => {
        if (!book.isAvailable) {
            throw errorMessages.bookNotAvialable(book.name)
        }
    }

    static checkAvailibilityOfBooks = async (books: Book[]) => {
        for (let book of books) {
            await this.checkAvailibilityOfBook(book)
        }
    }
}