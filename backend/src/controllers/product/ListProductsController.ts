import { Request, Response } from "express";
import { ListProductsService } from "../../services/product";

class ListProductsController{
  async handle(req: Request, res: Response) {
    const listProducts = new ListProductsService();

    const products = await listProducts.execute()

    return res.json(products)
  }
}

export { ListProductsController }