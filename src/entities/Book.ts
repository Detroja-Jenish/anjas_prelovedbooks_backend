import { Column, DeepPartial, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { BookVideo } from "./BookVideo";
import { BookImage } from "./BookImage";
import { DateValues } from "date-fns";

@Entity("Books")
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column()
    price: number

    @Column({
        default: 0
    })
    discount: number

    @Column()
    author: string

    @Column({ nullable: true })
    publisher: string

    @Column()
    coverImage: string

    @Column({ default: true })
    isAvailable: boolean

    @Column({ default: false })
    isSoldOut: boolean

    @Column({ nullable: true, default: null })
    reservedUntil: Date

    @ManyToMany(
        type => Category,
        category => category.books,
        { cascade: true }
    )
    @JoinTable({
        joinColumn: {
            name: "bookId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "categoryId",
            referencedColumnName: "id"
        },
    })
    categories: Category[]

    @OneToMany(
        type => BookImage,
        bookImage => bookImage.book,
        { cascade: true, onDelete: "CASCADE" },
    )
    images: BookImage[]

    @OneToMany(() => BookVideo,
        (bookVideo) => bookVideo.book,
        { cascade: true, onDelete: "CASCADE" })
    videos: BookVideo[];
}

export type IBook = Omit<Omit<Omit<DeepPartial<Book>, "images">, "videos">, "categories">
    & {
        categoryIds: number[],
        images: string[],
        videos: string[]
    }