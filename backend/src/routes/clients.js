import express from 'express';
import {
  getClientByCin,
  getAccountsByClientCin,
  getAccountByNumber
} from '../controllers/clientsController.js';

const router = express.Router();

router.get('/:cin', getClientByCin);
router.get('/:cin/accounts', getAccountsByClientCin);

router.get('/:number', getAccountByNumber);
export default router;
