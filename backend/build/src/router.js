"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const user_1 = require("./controllers/user");
const category_1 = require("./controllers/category");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const product_1 = require("./controllers/product");
const order_1 = require("./controllers/order");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./images"));
router.get('/', (req, res) => {
    return res.json({ Ok: true });
});
// Rotas Livres
router.post('/users', new user_1.CreateUserController().handle);
router.post('/session', new user_1.AuthRequestController().handle);
// Rotas com Middleware isAuthenticated
router.use(isAuthenticated_1.isAuthenticated);
router.get('/me', new user_1.DetailUserController().handle);
// Category
router.post("/category", new category_1.CreateCategoryController().handle);
router.get("/category", new category_1.ListCategoryController().handle);
router.delete("/category", new category_1.DeleteCategoryController().handle);
router.put("/category", new category_1.UpdateCategoryController().handle);
// Product
router.post("/product", upload.single('file'), new product_1.CreateProductController().handle);
router.get("/category/product", new product_1.ListByCategoryController().handle);
router.get("/product", new product_1.ListProductsController().handle);
// Order
router.post("/order", new order_1.CreateOrderController().handle);
router.delete("/order", new order_1.RemoveOrderController().handle);
router.post("/order/add", new order_1.AddItemController().handle);
router.delete("/order/remove", new order_1.RemoveItemController().handle);
router.put("/order/send", new order_1.SendOrderController().handle);
router.get("/orders", new order_1.ListOrderController().handle);
router.get("/order/detail", new order_1.DetailOrderController().handle);
router.put("/order/finish", new order_1.FinishOrderController().handle);
