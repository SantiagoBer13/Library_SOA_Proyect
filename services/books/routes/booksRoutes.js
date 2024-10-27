import { Router } from "express";
import { getAllBooks, getBookById, getAvailibilityBookById, createBook, updateBook, deleteBook } from "../controllers/booksController.js";
import { validateBookIdParam, validateBookCreation, validateBookUpdate } from "../validation/bookValidation.js";
import { validationResult } from "express-validator";

const router = Router();

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rutas con validación
router.get('/', getAllBooks);
router.get('/:id', validateBookIdParam, validateRequest, getBookById);
router.get('/:id/availability', validateBookIdParam, validateRequest, getAvailibilityBookById);
router.post('/', validateBookCreation, validateRequest, createBook);
router.put('/:id', validateBookIdParam, validateBookUpdate, validateRequest, updateBook);
router.delete('/:id', validateBookIdParam, validateRequest, deleteBook);

export default router;
