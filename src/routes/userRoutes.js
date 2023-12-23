import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authVerifyToken.js";

const router = Router();

router.get('/:username', userController.getUserByID);
router.post('/', userController.addUserSkill);
router.post('/:username/skill', userController.addUserSkill);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUserById);


export default router