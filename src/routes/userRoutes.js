import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get('/:username', userController.getUserByID);

export default router