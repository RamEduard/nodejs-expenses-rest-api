import { Router } from "express";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import recordRoutes from "./record.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Expenses REST API is working" });
});

router.post("/", (req, res) => {
  const body = req.body;
  res.json({ message: "Expenses REST API is working", data: body });
});

router.use(authRoutes);
router.use("/categories", categoryRoutes);
router.use("/records", recordRoutes);

export default router;
