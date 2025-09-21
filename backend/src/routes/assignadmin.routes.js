import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import { assignAdmin } from "../controllers/assignadmin.controller.js";

const assign_admin_router = express.Router();


assign_admin_router.post("/assign-admin", authMiddleware, authorizeRoles("superadmin"), assignAdmin);

export default assign_admin_router;