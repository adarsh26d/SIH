import express from "express"
import { check, signin, signout, signup } from "../controllers/auth.controller"

const authRouter = express()

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("signout", signout)
authRouter.get("/check", check)

export default authRouter