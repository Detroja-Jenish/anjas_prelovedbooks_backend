import { BookPartial } from "./bookTypes"

export type CartGetByIdResponseType = {
    totalAmount: number
    books: BookPartial[]
}

export type AddRemoveBookType = {
    bookId: number
}

export type AddRemoveBookResponse = {
    totalAmount: number
    book: BookPartial
}