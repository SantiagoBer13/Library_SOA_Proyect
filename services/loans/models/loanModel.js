import { pool } from "../database/loansDatabase.js";

export const getAllLoans = () => {
    return pool.query("SELECT * FROM loans");;
}

export const getLoanById = (id) => {
    return pool.query("SELECT * FROM loans WHERE id = ?", [id]);
}

export const getLoansByUserId = async (id) => { 
    return pool.query("SELECT * FROM loans WHERE user_id = ?;", [id]);;
}

export const createLoan = async (loanData) => {
    const { book_id, user_id, return_date } = loanData;
    const [result] = await pool.query(
        "INSERT INTO LOANS (book_id, user_id, return_date) VALUES (?, ?, ?)",
        [book_id, user_id, return_date]
    );
    return result.insertId; // Devuelve el ID del nuevo libro creado
}

export const updateLoan = async (id, loanData) => {
    const { book_id, user_id, status, return_date } = loanData;
    const [result] = await pool.query(
        "UPDATE loans SET book_id = IFNULL(?, book_id), user_id = IFNULL(?, user_id), status = IFNULL(?, status), return_date = IFNULL(?, return_date) WHERE id = ?",
        [book_id, user_id, status,return_date, id]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
}

