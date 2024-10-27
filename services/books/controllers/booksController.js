import * as bookService from '../services/bookService.js';

// Obtener todos los libros
export const getAllBooks = async (req, res) => {
    try {
        const [books] = await bookService.fetchAllBooks();
        return res.json(books);
    } catch (error) {
        console.error("Error fetching all books:", error);
        return res.status(500).json({ message: "There was a problem retrieving the books." });
    }
}

// Obtener un libro por ID
export const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const [book] = await bookService.fetchBookById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        return res.json(book);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return res.status(500).json({ message: "There was a problem retrieving the book." });
    }
}

// Obtener las copias disponibles de un libro
export const getAvailibilityBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const [copies] = await bookService.fetchAvailibilityBookById(id);

        if (!copies[0]) {
            return res.status(404).json({ message: "Book not found." });
        }

        return res.json(copies[0]);
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return res.status(500).json({ message: "There was a problem retrieving the book." });
    }
}

// Crear un nuevo libro
export const createBook = async (req, res) => {
    try {
        const bookId = await bookService.createNewBook(req.body);
        return res.status(201).json({ id: bookId, ...req.body });
    } catch (error) {
        console.error("Error creating book:", error);
        if (error.message.includes("requeridos")) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "There was a problem creating the book." });
    }
}

// Actualizar un libro
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await bookService.updateExistingBook(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "Book not found." });
        }

        return res.json({ message: "Book updated successfully." });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ message: "There was a problem updating the book." });
    }
}

// Eliminar un libro
export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const [result] = await bookService.removeBook(bookId); 

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found." });
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "There was a problem deleting the book." });
    }
};

