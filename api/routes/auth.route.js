import express from "express"
import {
  signup,
  signin,
  google,
  signOut,
} from "../controllers/auth.controller.js"

const router = express.Router()

// aqui fica todas rotas do usuário sendo chamadas pelo /api/user

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/signout", signOut)

export default router
