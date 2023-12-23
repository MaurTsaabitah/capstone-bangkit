import { Router } from "express";
import { predictCareerController } from "../controllers/predictController.js";

const router = Router();

router.post('/:username', predictCareerController);

export default router;