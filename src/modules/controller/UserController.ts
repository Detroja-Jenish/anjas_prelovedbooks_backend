import AppDataSource from "../../AppDataSource";
import { User } from "../../entities/User";

export class UserController {
    static userRepository = AppDataSource.getRepository(User)
    static save = async (user: User) => {
        await this.userRepository.save(user)
    }
}