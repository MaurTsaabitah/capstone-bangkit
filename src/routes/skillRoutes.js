import { Router } from "express";
import { addSkill, getSkills } from "../controllers/skillController.js";
import { updateUser } from "../controllers/userController.js";

const router = Router();

router.get('/', getSkills)
router.post('/', addSkill);
router.put('/:id', updateUser);

export default router;