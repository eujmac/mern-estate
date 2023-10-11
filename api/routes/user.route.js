import express from "express"
import { test } from "../controllers/user.controller.js"

const router = express.Router()

// aqui fica todas rotas do usuário sendo chamadas pelo /api/user

router.get("/test", test)

export default router
