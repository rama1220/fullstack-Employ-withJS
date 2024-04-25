import { Router } from "express";
import loginRoute from "./loginRoute.js";
import userRoute from "./userRoute.js";
const router = Router();
router.use(loginRoute);
router.use(userRoute);
export default router