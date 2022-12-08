import prismaClient from "../../prisma";

class ListAllOrderService {
  async execute() {
    const orders = await prismaClient.order.findMany({
      where: {
        deleted: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    return orders;
  }
}

export { ListAllOrderService }