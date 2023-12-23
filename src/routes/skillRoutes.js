import { Router } from "express";
import { addSkill, getSkills } from "../controllers/skillController.js";

const router = Router();

router.get('/', getSkills)
router.post('/', addSkill);

export default router;