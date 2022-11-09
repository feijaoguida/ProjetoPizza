import { Router, Request, Response } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthRequestController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthRequestController().handle)

router.use(isAuthenticated)

router.get('/me', new DetailUserController().handle)

router.post("/category", new CreateCategoryController().handle)

export { router };