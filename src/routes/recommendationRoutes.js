import { Router } from "express";
import { createRecommendationController } from "../controllers/recommendationController.js";

const router = Router();

router.post('/:username', createRecommendationController);

export default router;