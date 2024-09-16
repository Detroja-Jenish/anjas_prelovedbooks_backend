import { DeepPartial } from "typeorm";
import { Address } from "../../entities/Address";

export type AddressCreateType = DeepPartial<Address>;