import { Router } from 'express';
import {login} from '../controllers/auth.professor.controller.js'
const router = Router();


router.post("/",login)

export default router;