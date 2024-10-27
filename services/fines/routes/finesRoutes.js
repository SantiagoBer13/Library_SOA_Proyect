import { Router } from "express";
import { getAllFines, getFineById, getFinesByUserId,getFinesPendientsByUserId, createFine, payFine} from "../controllers/finesController.js";

const router = Router();

router.get('/', getAllFines);
router.get('/:id', getFineById);
router.get('/user/:user_id', getFinesByUserId)
router.get('/user/:user_id/summary', getFinesPendientsByUserId)
router.post('/', createFine);
router.put('/:id/pay', payFine);

export default router