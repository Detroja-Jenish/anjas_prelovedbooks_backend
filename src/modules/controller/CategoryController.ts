import { In, IsNull, Not } from "typeorm"
import AppDataSource from "../../AppDataSource"
import { Category } from "../../entities/Category"
import errorMessages from "../../utils/errorMessages"

export class CategoryController {
    static categoryRepository = AppDataSource.getRepository(Category)
    static findByIds = async (ids: number[]) => {
        return await this.categoryRepository.findBy({ id: In(ids) })
    }

    static findById = async (categoryId: string) => {
        const category = await this.categoryRepository.findOne(
            {
                where: { id: categoryId },
                relations: ["children"]
            }
        )
        if (!category) throw errorMessages.categoryNotFound
        return category
    }

    static create = async (categoryName: string, parentId: string | null | undefined) => {
        const category = new Category()
        category.categoryName = categoryName
        category.id = categoryName.split(" ").join("-")
        if (parentId) {
            const parentCategory = await this.findById(parentId)
            category.parent = parentCategory
        }
        await this.categoryRepository.save(category)

        return category
    }

    static getAllSubCategoryOnly = async () => {
        return await this.categoryRepository.find({
            where: {
                parent: Not(IsNull())
            },
            // relations: { children: true }
        })
    }

    static getAll = async () => {
        return await this.categoryRepository.find({
            where: { parent: IsNull() },
            relations: { children: { children: { children: true } } }
        })
    }
}