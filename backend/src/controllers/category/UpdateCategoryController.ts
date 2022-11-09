import { Request, Response } from "express";

interface DataDetailUpdate {
  id: string,
  name: string,
}

import { UpdateCategoryService } from "../../services/category";

class UpdateCategoryController{
  async handle(req: Request, res: Response) {
    const data: DataDetailUpdate = req.body
    console.log("data = ", data)
    const updateCategoryService = new UpdateCategoryService();
    const category = await updateCategoryService.execute(data);

    return res.json(category);
  }
}

export { UpdateCategoryController }