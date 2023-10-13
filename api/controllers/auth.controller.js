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
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"))
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
export const google = async (req, res, next) => {
  try {
    // testa se o usuário existe
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      // se existir cria o token jwt
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      // retira a senha do objeto user para poder retornar um json sem a senha
      const { password: pass, ...rest } = user._doc
      // cria a resposta com um cookie, status 200 e o resto do objeto user
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    } else {
      // se o usuário não existir, cria uma senha para ser armazenada pois no modelo User, a senha é required e o google não retorna a senha do usuário
      // senha com 16 caracteres
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      // senha criptografada
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      // criando o novo usuário no banco de dados, username vem separado (joão marcos), então justamos, deixamos em lowercase e colocamos 4 caracteres aleatórios no final
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      await newUser.save()
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token")
    res.status(200).json("User has been logged out!")
  } catch (error) {
    next(error)
  }
}
