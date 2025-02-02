
import express from "express";
import { create, login } from '../controller/user/index.js';

const router = express.Router();

router.post('/create', create)
router.post('/login', login)

export default router;