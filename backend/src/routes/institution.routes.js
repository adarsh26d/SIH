import express from "express"
import { addInstitution, getInstitutions } from "../controllers/institution.controller.js"
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js"

const institutionRouter = express()

institutionRouter.post("/add", authMiddleware, authorizeRoles("admin"), addInstitution)
institutionRouter.get("/get-institutions", getInstitutions)

export default institutionRouter