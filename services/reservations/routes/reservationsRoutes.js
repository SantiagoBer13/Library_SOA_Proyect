import { Router } from "express";
import { getAllReservations, getFirstReservationOfBook, createReservation, deleteReservation, updateReservation } from "../controllers/reservationController.js";

const router = Router();

router.get('/', getAllReservations);
router.get('/:id', getFirstReservationOfBook);
router.put('/:id', updateReservation);
router.post('/', createReservation);
router.delete('/:id', deleteReservation);

export default router