import prismaClient from "../../prisma";

class DeleteCategoryService{
  async execute(id: string) {
    const categoryList = await prismaClient.category.update({
      where: {
        id: id
      }, 
      data: {
        deleted: true,
        updated_at: new Date()
      }
    })

    return categoryList
  }
}

export { DeleteCategoryService }