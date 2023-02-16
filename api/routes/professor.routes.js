import  {  Router } from "express";
import globalMiddleware from "../middlewares/global.middlewares.js";
import {authMiddleware} from "../middlewares/auth.professor.middleware.js";
import userController from "../controllers/professor.controller.js";

const router = Router();


router.post("/",userController.create);
router.get("/",userController.findAllUsers);
router.get("/:id",userController.findById);
router.patch("/update/:id",userController.updateProfessorById);
router.delete("/delete/:id",userController.deleter);

export default router;