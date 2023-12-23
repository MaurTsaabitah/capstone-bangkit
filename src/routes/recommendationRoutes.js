import { Router } from "express";
import { createRecommendationController, getRecommendationControllerById } from "../controllers/recommendationController.js";

const router = Router();

router.get('/:id', getRecommendationControllerById)
router.post('/:id', createRecommendationController);

export default router;