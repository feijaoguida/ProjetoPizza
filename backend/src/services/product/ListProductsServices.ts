import prismaClient from "../../prisma";

class ListProductsService{
  async execute() {
    const findProducts = await prismaClient.product.findMany({
      where: { }
    })

    return findProducts
  }
}

export { ListProductsService }