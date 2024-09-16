import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
@Entity("BookVideoes")
export class BookVideo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    videoURL: string

    @ManyToOne(
        type => Book,
        Book => Book.videos,
        { onDelete: 'CASCADE' }
    )
    book: Book
}