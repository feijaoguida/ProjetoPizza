import { Router, Request, Response } from 'express'

import { CreateUserController, AuthRequestController, DetailUserController } from './controllers/user';

import { CreateCategoryController, ListCategoryController, DeleteCategoryController, UpdateCategoryController } from './controllers/category';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthRequestController().handle)

router.use(isAuthenticated)

router.get('/me', new DetailUserController().handle)

router.post("/category", new CreateCategoryController().handle)
router.get("/category", new ListCategoryController().handle)
router.delete("/category", new DeleteCategoryController().handle)
router.put("/category", new UpdateCategoryController().handle)

export { router };