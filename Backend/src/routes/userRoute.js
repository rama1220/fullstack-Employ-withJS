import { Router } from "express";
import * as userController from "../controllers/userControllers.js";
import { authToken, authorizePermission } from '../middleware/authMiddleware.js'

const router = Router();
router.use(authToken);
router.post("/register", userController.createAdmin);
router.get("/employee/:id", authorizePermission("read_employee"), userController.getEmployeeById);
router.get("/profile", authorizePermission("read_user_profile"), userController.readProfile);
router.put("/profile/:id", authorizePermission("update_user_profile"), userController.updateProfile);
router.post("/employee", authorizePermission("create_employee"), userController.handleCreateEmploy);
router.delete("/employee/:id", authorizePermission("delete_employee"), userController.deleteEmployee);
router.get("/employee", authorizePermission("read_employee"), userController.readEmploy);
router.put("/employee/:id", authorizePermission("update_employee"), userController.updateEmployee);

export default router;
