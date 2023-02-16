import  {  Router } from "express";
import globalMiddleware from "../middlewares/global.middlewares.js";
import {authMiddleware} from "../middlewares/auth.professor.middleware.js";
import disciplinesController from "../controllers/discipline.controller.js";

const router = Router();


router.post("/",disciplinesController.create);
router.get("/",disciplinesController.findAll);
router.get("/search",disciplinesController.searchByTitle);
router.get("/:id",disciplinesController.findById);
router.get("/professor/:id",disciplinesController.ByProfessor);
router.patch("/update/:id",disciplinesController.update);
router.delete("/delete/:id", disciplinesController.deleter);

export default router;