import express from 'express';
import { submitFullCreditRequest } from '../controllers/fullCreditRequestController.js';

const router = express.Router();
router.post('/', submitFullCreditRequest);

export default router;