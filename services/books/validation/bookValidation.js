import { body, param } from "express-validator";

export const validateBookCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("isbn").notEmpty().withMessage("ISBN is invalid"),
  body("published_year")
    .isInt({ min: 1500, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
  body("available_copies")
    .isInt({ min: 0 })
    .withMessage("Available copies must be a positive integer"),
];

export const validateBookUpdate = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("author").optional().notEmpty().withMessage("Author cannot be empty"),
  body("isbn").optional().isISBN().withMessage("ISBN is invalid"),
  body("published_year")
    .optional()
    .isInt({ min: 1500, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
  body("available_copies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available copies must be a positive integer"),
];

export const validateBookIdParam = [
  param("id").isInt().withMessage("ID must be an integer"),
];
