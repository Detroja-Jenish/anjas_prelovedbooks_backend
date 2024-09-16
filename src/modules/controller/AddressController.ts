import AppDataSource from "../../AppDataSource"
import { Address } from "../../entities/Address"
import errorMessages from "../../utils/errorMessages"
import { AddressCreateType } from "../typees/addressType"

export class AddressController {
    static addressRepository = AppDataSource.getRepository(Address)
    static create = async (addressData: AddressCreateType) => {
        try {
            const address = new Address()
            address.addressLine1 = addressData.addressLine1!
            address.addressLine2 = addressData.addressLine2!
            address.city = addressData.city!
            address.state = addressData.state!
            address.postalCode = addressData.postalCode!
            await this.addressRepository.save(address)
            return address
        } catch (error) {
            throw errorMessages.addressNotInserted
        }
    }

    static matchAddress = (address: Address, toMatchAddress: Address) => {
        return (
            address.addressLine1 === toMatchAddress.addressLine1
            && address.addressLine2 === toMatchAddress.addressLine2
            && address.city === toMatchAddress.city
            && address.postalCode === toMatchAddress.postalCode
            && address.state === toMatchAddress.state
        )
    }
}