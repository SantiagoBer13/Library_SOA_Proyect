import { pool } from "../database/booksDatabase.js";

export const getAllBooks = () => {
    return pool.query("SELECT * FROM books");
}

export const getBookById =  (id) => {
    return pool.query("SELECT * FROM books WHERE id = ?", [id]);
}

export const getAvailableCopies = async (id) => {
    return pool.query("SELECT available_copies FROM books WHERE id = ?", [id]);
}

export const createBook = async (bookData) => {
    const { title, author, isbn, published_year, genre, available_copies } = bookData;
    const [result] = await pool.query(
        "INSERT INTO books (title, author, isbn, published_year, genre, available_copies) VALUES (?, ?, ?, ?, ?, ?)",
        [title, author, isbn, published_year, genre, available_copies]
    );
    return result.insertId; // Devuelve el ID del nuevo libro creado
}

// export const updateBook = async (id, bookData) => {
//     const { title, author, isbn, published_year, genre, available_copies } = bookData;
//     const [result] = await pool.query(
//         "UPDATE books SET title = IFNULL(?, title), author = IFNULL(?, author), isbn = IFNULL(?, isbn), published_year = IFNULL(?, published_year), genre = IFNULL(?, genre), available_copies = IFNULL(?, available_copies) WHERE id = ?",
//         [title, author, isbn, published_year, genre, available_copies, id]
//     );
//     return result.affectedRows; // Devuelve el número de filas afectadas
// }

export const updateBook = async (id, bookData) => {
    // Construimos una consulta y parámetros dinámicos
    let query = "UPDATE books SET ";
    const params = [];
    
    for (const [key, value] of Object.entries(bookData)) {
        if (value !== undefined) { // Si el valor no es undefined, agregamos a la consulta
            query += `${key} = ?, `;
            params.push(value);
        }
    }

    // Quitamos la última coma y espacio, y agregamos la cláusula WHERE
    query = query.slice(0, -2) + " WHERE id = ?";
    params.push(id);

    const [result] = await pool.query(query, params);
    return result.affectedRows; // Devolvemos el número de filas afectadas
}


export const deleteBook = (id) => {
    return pool.query("DELETE FROM books WHERE id = ?", [id]);; // Devuelve el número de filas afectadas
}
