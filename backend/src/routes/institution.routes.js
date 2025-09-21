import express from "express"
import { addInstitution, addStudent, addTeacher, getInstitutions } from "../controllers/institution.controller.js"
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js"
import { isInstitutionAdmin } from "../middlewares/IsInstituteAdmin.js"

const institutionRouter = express()

institutionRouter.post("/add", authMiddleware, authorizeRoles("admin"), addInstitution)
institutionRouter.get("/get-institutions", getInstitutions)
institutionRouter.post("/:id/add-teacher", authMiddleware, isInstitutionAdmin, addTeacher);
institutionRouter.post("/:id/add-student", authMiddleware, isInstitutionAdmin, addStudent);

export default institutionRouter