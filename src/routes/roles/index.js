import { Router } from "express";
import { getAllRoles, createRole } from "../../controllers/role.controller.js";
import authVerfity from "../../middleware/authVerfity.js";

const router = Router();

// Создать новую роль
router.post("/create", createRole);
// Отобразить все роли
router.get("/get", authVerfity, getAllRoles);

export default router;
