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

recordRoutes.get("/totals/:from/:to", RecordController.getTotals);
recordRoutes.get("/totals/by-category/:from/:to", RecordController.getTotalsByCategory);
recordRoutes.get("/totals/by-month/:from/:to", RecordController.getTotalsByMonth);

export default recordRoutes;
