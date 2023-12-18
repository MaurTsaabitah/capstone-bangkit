import { getQuestion } from "../controllers/questionController.js";
import { Router } from "express";

const router = Router();

router.get("/", getQuestion);

export default router;
