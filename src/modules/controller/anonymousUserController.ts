import AppDataSource from "../../AppDataSource"
import { AnonymousUser } from "../../entities/AnonymousUser"

export class anonymousUserController {
    static anonymousUserRepository = AppDataSource.getRepository(AnonymousUser)
    static save = async (anonymousUser: AnonymousUser) => {
        await this.anonymousUserRepository.save(anonymousUser)
    }
}