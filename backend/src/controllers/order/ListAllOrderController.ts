import { Request, Response } from "express";
import { ListAllOrderService } from "../../services/order";

class ListAllOrderController{
  async handle(req: Request, res: Response) {
    const listAllOrderService = new ListAllOrderService();

    const orders = await listAllOrderService.execute()

    return res.json(orders)
    
  }
}

export { ListAllOrderController }