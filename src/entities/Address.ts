import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Addresses")
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    addressLine1: string;
    @Column()
    addressLine2: string;
    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    postalCode: string;
}
