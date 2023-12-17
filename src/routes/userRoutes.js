import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authVerifyToken.js";

const router = Router();

router.get('/:username', verifyToken, userController.getUserByID);
router.put('/:id', userController.updateUser);


export default router