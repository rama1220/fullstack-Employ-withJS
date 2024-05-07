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
router.post("/createDivision", authorizePermission("create_divisi"), userController.createDivision);
router.put("/division/:id", authorizePermission("update_divisi"), userController.updateDivision);
router.get("/division", authorizePermission("read_divisi"), userController.getAllDivision);
router.delete("/division/:id", authorizePermission("delete_divisi"), userController.deleteDiv);
router.get("/division/:id", authorizePermission("read_divisi"), userController.getDivisiById);

export default router;
