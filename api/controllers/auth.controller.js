import User from "../models/User.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/erro.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

// controlador para cadastrar um usuário
export const signup = async (req, res, next) => {
  //recupera username email e senha do body da requisição
  const { username, email, password } = req.body
  //cria uma senha encriptada
  const hashedPassword = bcryptjs.hashSync(password, 10)
  // cria um novo modelo de usuário com User
  const newUser = new User({ username, email, password: hashedPassword })
  // tenta salvar no banco de dados
  try {
    await newUser.save()
    //retorna status 201 (criado) e mensagem
    res.status(201).json("User created successfully")
  } catch (error) {
    //retorna erro
    next(error)
  }
}

// controlador para login um usuário

export const signin = async (req, res, next) => {
  //recupera email e senha do body da requisição
  const { email, password } = req.body
  // tenta validar o login
  try {
    // procura o email recebido dentro do banco de dados
    const validUser = await User.findOne({ email })
    // se não achar email, retorna um erro 404 e mensagem
    if (!validUser) return next(errorHandler(404, "User not found!"))
    // testa se a senha recebida é igual a senha cadastrada
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    // se não achar senha, retorna um erro 404 e mensagem
    if (!validPassword) return next(errorHandler(401, "Wrong credential!"))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    const { password: pass, ...rest } = validUser._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}
