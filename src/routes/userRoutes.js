import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { verifyTokenAndAuthorization } from "../middleware/authVerifyToken.js";

const router = Router();

router.get('/:username', userController.getUserByID);
router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);

export default router