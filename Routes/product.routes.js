import { Router } from "express";
import { addproduct, getAllProducts, getSingleProducts } from "../Controllers/Product.controller.js";

const router = Router()

router.post('/add-product',addproduct)
router.get('/get-all',getAllProducts)
router.get('/get-single',getSingleProducts)

export default router