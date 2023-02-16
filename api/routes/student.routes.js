import  {  Router } from "express";
import globalMiddleware from "../middlewares/global.middlewares.js";
import {authMiddleware} from "../middlewares/auth.student.middleware.js";
import userController from "../controllers/student.controller.js";

const router = Router();


router.post("/",userController.create);
router.get("/",authMiddleware,userController.findAllUsers);
router.get("/:id",authMiddleware,globalMiddleware.isValidId,globalMiddleware.isValidStudent,userController.findById);
router.patch("/update/:id",authMiddleware,globalMiddleware.isValidId,globalMiddleware.isValidStudent,userController.updateStudentById);
router.delete("/delete/:id",authMiddleware,globalMiddleware.isValidId, globalMiddleware.isValidStudent, userController.deleter);

export default router;