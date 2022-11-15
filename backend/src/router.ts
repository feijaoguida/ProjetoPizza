import { Router, Request, Response } from 'express'
import multer from 'multer';

import { CreateUserController, AuthRequestController, DetailUserController } from './controllers/user';
import { CreateCategoryController, ListCategoryController, DeleteCategoryController, UpdateCategoryController } from './controllers/category';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateProductController, ListByCategoryController, ListProductsController } from './controllers/product';
import { AddItemController, CreateOrderController, RemoveOrderController, RemoveItemController, SendOrderController, ListOrderController, DetailOrderController, FinishOrderController } from './controllers/order';

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./images"))

// Rotas Livres
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthRequestController().handle)

// Rotas com Middleware isAuthenticated
router.use(isAuthenticated)

router.get('/me', new DetailUserController().handle)

// Category
router.post("/category", new CreateCategoryController().handle)
router.get("/category", new ListCategoryController().handle)
router.delete("/category", new DeleteCategoryController().handle)
router.put("/category", new UpdateCategoryController().handle)

// Product
router.post("/product", upload.single('file'), new CreateProductController().handle)
router.get("/category/product", new ListByCategoryController().handle)
router.get("/product", new ListProductsController().handle)

// Order
router.post("/order", new CreateOrderController().handle)
router.delete("/order", new RemoveOrderController().handle)
router.post("/order/add", new AddItemController().handle)
router.delete("/order/remove", new RemoveItemController().handle)
router.put("/order/send", new SendOrderController().handle)
router.get("/orders", new ListOrderController().handle)
router.get("/order/detail", new DetailOrderController().handle)
router.put("/order/finish", new FinishOrderController().handle)

export { router };