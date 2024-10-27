import { pool } from "../database/usersDatabase.js";

export const getAllUsers = () => {
    return pool.query("SELECT * FROM users");;
}

export const getUserById = (id) => {
    const [rows] = pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null; // Devuelve el libro o null si no se encuentra
}

export const createUser = async (userData) => {
    const { full_name, email, phone_number } = userData;
    const [result] = await pool.query(
        "INSERT INTO users (full_name, email, phone_number) VALUES (?, ?, ?)",
        [full_name, email, phone_number]
    );
    return result.insertId; // Devuelve el ID del nuevo libro creado
}

export const updateUser = async (id, userData) => {
    const { full_name, email, phone_number } = userData;
    const [result] = await pool.query(
        "UPDATE users SET full_name = IFNULL(?, full_name), email = IFNULL(?, email), phone_number = IFNULL(?, phone_number) WHERE id = ?",
        [full_name, email, phone_number, id]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
}

export const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
}
