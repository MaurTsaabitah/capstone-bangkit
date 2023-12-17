import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { refreshToken } from "../utils/refreshToken.js";

const router = Router();

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.delete('/logout', authController.logoutUser);
router.post('/token', refreshToken);

export default router;