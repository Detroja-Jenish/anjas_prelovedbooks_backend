import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { AnonymousUser } from "./AnonymousUser";
import { Order } from "./Order";

@Entity("Carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 0 })
    totalAmount: number

    @ManyToMany(
        type => Book,
    )
    @JoinTable(
        { name: "CartWiseBooks", },
    )
    books: Book[]

    @OneToOne(
        type => User,
        user => user.cart,
        { nullable: true, onDelete: "CASCADE" }
    )
    user: User

    @OneToOne(
        type => AnonymousUser,
        anonymousUser => anonymousUser.cart,
        { nullable: true, onDelete: "CASCADE" }
    )
    anonymousUser: AnonymousUser

    @OneToOne(
        type => Order,
        { nullable: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    order: Order

}