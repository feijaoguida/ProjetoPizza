import { Request, Response } from "express";

import { DeleteCategoryService } from "../../services/category";

class DeleteCategoryController{
  async handle(req: Request, res: Response) {
    const id  = req.query.id as string
    const deleteCategoryService = new DeleteCategoryService();
    const category = await deleteCategoryService.execute(id);

    return res.json(category);
  }
}

export { DeleteCategoryController }