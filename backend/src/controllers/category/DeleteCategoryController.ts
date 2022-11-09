import { Request, Response } from "express";

import { DeleteCategoryService } from "../../services/category";

class DeleteCategoryController{
  async handle(req: Request, res: Response) {
    console.log("Params = ", req.query)
    const id  = req.query.id as string
    console.log("id = ", id)
    const deleteCategoryService = new DeleteCategoryService();
    const category = await deleteCategoryService.execute(id);

    return res.json(category);
  }
}

export { DeleteCategoryController }