import { Router } from "express";
import { AreaController } from "../controllers/area.controller";
import { validate } from "../middlewares/validate";
import { createAreaSchema, updateAreaSchema } from "../validators/area.validator";

const router = Router();
const controller = new AreaController();

router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", validate(createAreaSchema), controller.create);
router.put("/:id", validate(updateAreaSchema), controller.update);
router.delete("/:id", controller.delete);

export default router;
