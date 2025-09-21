import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import { createSubject, createClassroom, addStudentsToClassroom } from "../controllers/classroom.controller.js";

const classroomRouter = express.Router();

classroomRouter.post("/subjects", authMiddleware, authorizeRoles("admin"), createSubject);
classroomRouter.post("/classrooms", authMiddleware, authorizeRoles("admin"), createClassroom);
classroomRouter.post("/classrooms/:id/add-students", authMiddleware, authorizeRoles("admin"), addStudentsToClassroom);

export default classroomRouter;
