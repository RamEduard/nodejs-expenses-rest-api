import { Router } from "express";
import { RecordController } from "../controllers/record.controller.js";

const recordRoutes = Router();

recordRoutes.get("/", RecordController.getAll);
recordRoutes.post("/", RecordController.create);
recordRoutes.get("/:type", RecordController.getAllByType);
recordRoutes.get("/record/:id", RecordController.getById);
recordRoutes.put("/:id", RecordController.updateById);
recordRoutes.delete("/trash/:id", RecordController.trashById);
recordRoutes.delete("/:id", RecordController.deleteById);

export default recordRoutes;
