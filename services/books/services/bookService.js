import * as bookModel from '../models/bookModel.js';

export const fetchAllBooks = () => {
    return bookModel.getAllBooks();
};

export const fetchBookById = (id) => {
    return bookModel.getBookById(id);
}

export const fetchAvailibilityBookById = (id) => {
    return bookModel.getAvailableCopies(id);;
}

export const createNewBook = async (bookData) => {
    return await bookModel.createBook(bookData);
}

export const updateExistingBook = async (id, bookData) => {
    return await bookModel.updateBook(id, bookData);
}

export const removeBook =  (id) => {
    return  bookModel.deleteBook(id);
}