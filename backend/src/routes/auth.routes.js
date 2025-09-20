import express from "express"
import { check, signin, signout, signup } from "../controllers/auth.controller.js"

const authRoutes = express()

authRoutes.post("/signup", signup)
authRoutes.post("/signin", signin)
authRoutes.post("/signout", signout)
authRoutes.get("/check", check)

export default authRoutes