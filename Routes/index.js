import { Router } from "express";
import authRoutes from '../Routes/auth.routes.js'
import productRoutes from '../Routes/product.routes.js'

const router = Router()

router.use('/auth',authRoutes)
router.use('/product',productRoutes)

export default router