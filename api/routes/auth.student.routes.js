import { Router } from 'express';
import {login} from '../controllers/auth.student.controller.js';
const router = Router();


router.post("/",login);

export default router;