import express from "express";
import { getNoteById, getOwnList, createNote, updateNote } from '../controller/notes/index.controller.js';
import authMiddleware from '../middleware/auth.middleware.js'

const router = express.Router();

router.get('/list', authMiddleware, getOwnList)
router.get('/:noteId', authMiddleware, getNoteById)

router.post('/create', authMiddleware, createNote)
router.patch('/:noteId', authMiddleware, updateNote)


export default router;