import { pool } from "../database/reservationsDatabase.js";

export const getAllReservations = () => {
    return pool.query("SELECT * FROM reservations");;
}

export const getFirstReservationOfBook = async (book_id) => {
    return pool.query("SELECT * FROM reservations WHERE book_id = ? ORDER BY created_at ASC LIMIT 1", [book_id]);
}

// export const getReservationById = async (id) => {
//     const [rows] = await pool.query("SELECT * FROM reservations WHERE id = ?", [id]);
//     return rows.length > 0 ? rows[0] : null; // Devuelve el libro o null si no se encuentra
// }

export const createReservation = async (reservationData) => {
    const { book_id, user_id } = reservationData;
    const [result] = await pool.query(
        "INSERT INTO reservations (book_id, user_id) VALUES (?, ?)",
        [book_id, user_id]
    );
    return result.insertId; // Devuelve el ID del nuevo libro creado
}

export const updateReservation = async (id, userData) => {
    const { book_id, user_id, status } = userData;
    const [result] = await pool.query(
        "UPDATE reservations SET book_id = IFNULL(?, book_id), user_id = IFNULL(?, user_id), status = IFNULL(?, status) WHERE id = ?",
        [book_id, user_id, status, id]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
}

export const deleteReservation = async (id) => {
    const [result] = await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
}
