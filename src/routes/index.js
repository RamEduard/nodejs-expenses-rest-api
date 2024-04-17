import { Router } from "express";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import recordRoutes from "./record.routes.js";
import { authorizeCallback } from "../config/passport.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Expenses REST API is working" });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.json({ message: "Expenses REST API is working", data: body });
});

router.use(authRoutes);
router.use("/categories", authorizeCallback(), categoryRoutes);
router.use("/records", authorizeCallback(), recordRoutes);

export default router;
