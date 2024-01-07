import { Router } from "express";
import { GetCurrentUser, Login, Register } from "../Controllers/Auth.controller.js";

const router = Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/get-user',GetCurrentUser)

export default router