import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authorizeCallback } from "../config/passport.js";

const authRoutes = Router();

authRoutes.post("/auth/login", AuthController.login);
authRoutes.post("/auth/register", AuthController.register);
authRoutes.get("/profile", authorizeCallback(), AuthController.userProfile);

export default authRoutes;
