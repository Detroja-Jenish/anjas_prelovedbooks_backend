import { DataSource } from "typeorm";
import "reflect-metadata"
import { Book } from "./entities/Book";
import { BookImage } from "./entities/BookImage";
import { BookVideo } from "./entities/BookVideo";
import { Category } from "./entities/Category";
import { Cart } from "./entities/Cart";
import { User } from "./entities/User";
import { Order } from "./entities/Order";
import { AnonymousUser } from "./entities/AnonymousUser";
import * as ormConfig from '../ormconfig.json';


const AppDataSource = new DataSource(
    {
        ...ormConfig,
        type: "mysql"
    }
)

export default AppDataSource