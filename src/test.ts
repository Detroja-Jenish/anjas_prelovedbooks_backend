import AppDataSource from "./AppDataSource";
import { Book } from "./entities/Book";
import { Category } from "./entities/Category";

AppDataSource.initialize().then(
    async () => {
        const newCategory = new Category()
        newCategory.categoryName = "demo _ 7"
        await AppDataSource.getRepository(Category).save(newCategory)

        // await newCategory.save()

        // const book = Book.create({
        //     name: "demo _ 4",
        //     author: "demo _ 4",
        //     coverImage: "demo _ 4",
        //     price: 123,
        //     categories: [newCategory],
        // })

        // await book.save()

        // console.log(book);

        // const books = await Book.find()
        // console.log(books);

        const categories = await Category.find()
        console.log(categories);


    }
)