import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Address } from "./Address";

@Entity("AnonymousUsers")
export class AnonymousUser {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(
        typr => Cart,
        { nullable: true, cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    cart: Cart

    @OneToMany(
        type => Order,
        order => order.anonymousUser,
        { cascade: true, onDelete: "DEFAULT" },
    )
    orders: Order[]
    @OneToOne(
        type => Address,
        { nullable: true, cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    address: Address;
} 