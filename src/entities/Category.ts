import { Column, DeepPartial, Entity, InferIdType, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
@Entity("Categories")
export class Category {
    @PrimaryColumn()
    id: string;

    @Column()
    categoryName: string;

    @ManyToMany(() => Book, (book) => book.categories)
    books: Book[];

    // Self-referencing Many-to-One relationship for the parent category
    @ManyToOne(() => Category, (category) => category.children, { nullable: true })
    parent: Category;

    // Self-referencing One-to-Many relationship for child categories
    @OneToMany(() => Category, (category) => category.parent)
    children: Category[];
}


export type ICategory = DeepPartial<Category>
