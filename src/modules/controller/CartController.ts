import AppDataSource from "../../AppDataSource"
import { Book } from "../../entities/Book"
import { Cart } from "../../entities/Cart"
import errorMessages from "../../utils/errorMessages"

export class CartController {
    static cartRepository = AppDataSource.getRepository(Cart)

    static save = async (cart: Cart) => {
        try {
            await this.cartRepository.save(cart)
        } catch (error) {
            throw errorMessages.someError
        }
    }
    static create = async () => {
        const cart = new Cart()
        await this.cartRepository.save(cart)
        return cart
    }

    static getById = async (id: number) => {
        // try {
        // const cart = await this.cartRepository.findOne({
        //     where: { id },
        //     select: {
        //         totalAmount: true,
        //         // books: {
        //         //     name: true,
        //         //     price: true,
        //         //     discount: true,
        //         //     coverImage: true,
        //         //     author: true,
        //         //     isAvailable: true,
        //         //     isSoldOut: true
        //         // },
        //         // order: {
        //         //     id: true
        //         // }
        //     },
        //     relations: {
        //         books: true,
        //         order: true
        //     }
        // })
        const cart = await this.cartRepository
            .createQueryBuilder("cart")
            .leftJoinAndSelect("cart.books", "books")
            .leftJoinAndSelect("cart.order", "order")
            .leftJoinAndSelect("cart.user", "user")
            .leftJoinAndSelect("user.address", "user_address")
            .leftJoinAndSelect("cart.anonymousUser", "anonymousUser")
            .leftJoinAndSelect("anonymousUser.address", "anonymousUser_address")
            .select([
                "cart.id",
                "cart.totalAmount",
                "books.id",
                "books.name",
                "books.price",
                "books.discount",
                "books.author",
                "books.coverImage",
                "books.isAvailable",
                "books.isSoldOut",
                "order.id",
                "user.id",
                "user_address.addressLine1",
                "user_address.addressLine2",
                "user_address.city",
                "user_address.state",
                "user_address.postalCode",
                "anonymousUser.id",
                "anonymousUser_address.addressLine1",
                "anonymousUser_address.addressLine2",
                "anonymousUser_address.city",
                "anonymousUser_address.state",
                "anonymousUser_address.postalCode",
            ])
            .where("cart.id = :id", { id })
            .getOne();
        if (!cart) throw errorMessages.cartNotFound
        return cart
        // } catch (error) {
        //     throw errorMessages.someError
        // }
    }

    static addBook = async (book: Book, cartId: number) => {
        const cart = await this.getById(cartId)
        console.log("cart", cart);
        console.log("book", book);
        console.log("!cart.books.find(_book => _book.id = book.id)", !cart.books.find(_book => _book.id == book.id))
        console.log("!cart.books.find(_book => _book.id = book.id)", cart.books.find(_book => _book.id == book.id))

        if (!cart.books.find(_book => _book.id == book.id)) {
            cart.books.push(book);
            cart.totalAmount += book.price;
            await this.cartRepository.save(cart)
        } else {
            throw errorMessages.alreadyInCart
        }
        return cart
    }
    static removeBook = async (book: Book, cart: Cart) => {
        if (cart.books.find(_book => _book.id == book.id)) {
            cart.books = cart.books.filter(tempBook => tempBook.id != book.id)
            cart.totalAmount -= book.price
            book.reservedUntil = null!
            await this.cartRepository.save(cart)
        }
        return cart
    }
}