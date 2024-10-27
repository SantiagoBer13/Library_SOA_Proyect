import { Router } from "express";
import { getAllLoans, getLoanById, getLoansByUserId, createLoan, updateLoan, returnLoan} from "../controllers/loansController.js";

const router = Router();

router.get('/', getAllLoans);
router.get('/:id', getLoanById);
router.get('/:user_id/loan-history', getLoansByUserId)
router.post('/', createLoan);
router.put('/:id', updateLoan);
router.put('/:id/return', returnLoan);

export default router