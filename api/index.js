import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()

mongoose
  .connect(
    "mongodb+srv://eujmac:eujmac@mern-estate.ocdxhtz.mongodb.net/mern-estate?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Not connected to MongoDB: Erro: ${err}`))

const app = express()
app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000!")
})
