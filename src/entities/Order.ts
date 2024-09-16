import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";
import { AnonymousUser } from "./AnonymousUser";
import { Address } from "./Address";
import { Payment } from "./Payment";
export enum OrderStatus {
    CREATED = 'created',
    INFOFILLED = "info-filled",
    PAID = 'paid',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
}
@Entity("Orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    totalAmount: number

    @Column({ default: 0 })
    discount: number

    @ManyToMany(
        type => Book,
    )
    @JoinTable(
        {
            name: "OrderItems",
            joinColumn: {
                name: "orderId",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "bookId",
                referencedColumnName: "id"
            },
        }
    )
    books: Book[]

    @ManyToOne(
        type => User,
        user => user.orders,
        { nullable: true, onDelete: "SET NULL" }
    )
    user: User

    @ManyToOne(
        type => AnonymousUser,
        anonymousUser => anonymousUser.orders,
        { nullable: true, onDelete: "SET NULL" }
    )
    anonymousUser: AnonymousUser
    @OneToOne(
        type => Address,
        { nullable: true, cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    address: Address;
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.CREATED
    })
    status: OrderStatus;
    @OneToOne(() => Payment, payment => payment.order)
    @JoinColumn()
    payment: Payment;
}