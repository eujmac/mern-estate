import express from "express"
import { test, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

// aqui fica todas rotas do usuário sendo chamadas pelo /api/user

router.get("/test", test)
// faz uma verificação de token antes de fazer o update
router.post("/update/:id", verifyToken, updateUser)

export default router
