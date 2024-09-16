import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
@Entity("BookImages")
export class BookImage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imageURL: string

    @ManyToOne(
        type => Book,
        Book => Book.images,
        { onDelete: 'CASCADE' }
    )
    book: Book
} 