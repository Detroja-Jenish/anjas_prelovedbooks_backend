import { Column, DeepPartial, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Address } from "./Address";

@Entity("Users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    password: string

    @OneToOne(
        typr => Cart,
        cart => cart.user,
        { nullable: true, cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    cart: Cart

    @OneToMany(
        type => Order,
        order => order.user,
        { cascade: true, onDelete: "SET NULL" },
    )
    orders: Order[]

    @OneToOne(
        type => Address,
        { nullable: true, cascade: true, onDelete: "SET NULL" }
    )
    @JoinColumn()
    address: Address;
}

export type IUser = DeepPartial<User>