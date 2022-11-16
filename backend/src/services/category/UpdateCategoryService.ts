import prismaClient from "../../prisma";

interface DataDetailUpdate {
  id: string,
  name: string,
}

class UpdateCategoryService{
  async execute(
    data: DataDetailUpdate) {
    const categoryList = await prismaClient.category.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        updated_at: new Date()
      },
    },
    
    )

    return categoryList
  }
}

export { UpdateCategoryService }