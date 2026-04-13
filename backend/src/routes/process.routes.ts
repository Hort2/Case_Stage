import { Router } from "express";
import { ProcessController } from "../controllers/process.controller";
import { validate } from "../middlewares/validate";
import {
  createProcessSchema,
  updateProcessSchema,
} from "../validators/process.validator";

const router = Router();
const controller = new ProcessController();

router.get("/search", controller.search);
router.get("/tree/:areaId", controller.getTree);
router.get("/:id", controller.findById);
router.post("/", validate(createProcessSchema), controller.create);
router.put("/:id", validate(updateProcessSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
