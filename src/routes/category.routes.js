import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRoutes = Router();

categoryRoutes.get("/", CategoryController.getAll);
categoryRoutes.post("/", CategoryController.create);
categoryRoutes.get("/:id", CategoryController.getById);
categoryRoutes.put("/:id", CategoryController.updateById);
categoryRoutes.delete("/:id", CategoryController.deleteById);

export default categoryRoutes;
