import { errorHandler } from "./erro.js"
import jwt from "jsonwebtoken"
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  // verifica se tem um token na aplicação
  if (!token) return next(errorHandler(401, "Unauthorized"))
  // verifica se esse token é valido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"))
    req.user = user
    next()
  })
}
