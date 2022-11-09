import prismaClient from "../../prisma";

class ListCategoryService{
  async execute() {
    const categoryList = await prismaClient.category.findMany({
      where: {
        deleted: false
      }, 
      select: {
        id: true,
        name: true,
      }
    })

    return categoryList
  }
}

export { ListCategoryService }