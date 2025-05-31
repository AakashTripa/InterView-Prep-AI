import express from 'express';
import { togglePinQuestion, updateQuestionNote,addQuestionsToSession, } from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/add',protect,addQuestionsToSession);

router.put('/:id/pin',protect,togglePinQuestion);
router.put('/:id/note',protect,updateQuestionNote);

export default router;