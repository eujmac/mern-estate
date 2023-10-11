import express from "express"
import { signup, signin } from "../controllers/auth.controller.js"

const router = express.Router()

// aqui fica todas rotas do usuário sendo chamadas pelo /api/user

router.post("/signup", signup)
router.post("/signin", signin)

export default router
