import { Router } from "express";
import { getRecommendationController, deleteRecommendationController } from "../controllers/recommendationController.js";

const router = Router();

router.get('/:id', getRecommendationController);
router.delete('/:id', deleteRecommendationController);

export default router;