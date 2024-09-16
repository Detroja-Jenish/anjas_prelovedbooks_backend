import { DeepPartial } from "typeorm"
import { Book } from "../../entities/Book"

export type BookCreate = Omit<Omit<Omit<DeepPartial<Book>, "categories">, "images">, "videos"> & {
    categoryIds: number[]
    images: string[]
    videos: string[]
}

export type BookPartial = {
    id: number
    name: string
    price: number
    discount: number
    coverImage: string
    author: string
    isAvailable: boolean
    isSoldOut: boolean
}

export type PaginationParams = {
    page?: number
    limit?: number
    categoryIds?: number[]
    minPrice?: number
    maxPrice?: number
}

export type PaginationData = {
    books: BookPartial[]
    meta: {
        totalBooks: number
        pageNumber: number
        totalPages: number
        limit: number
    }
}