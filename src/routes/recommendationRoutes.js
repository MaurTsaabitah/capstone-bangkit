import { Router } from "express";
import { createRecommendationController, deleteRecommendationController, getRecommendationControllerById } from "../controllers/recommendationController.js";

const router = Router();

router.get('/:id', getRecommendationControllerById)
router.post('/:id', createRecommendationController);
router.delete('/:id', deleteRecommendationController);

export default router;