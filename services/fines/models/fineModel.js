import { pool } from "../database/finesDatabase.js";

export const getAllFines = () => {
  return pool.query("SELECT * FROM fines ");
};

export const getFineById = (id) => {
  return pool.query("SELECT * FROM fines WHERE id  = ?", [id]);
};

export const getFinesByUserId = async (id) => {
  return pool.query("SELECT * FROM fines WHERE user_id  = ?", [id]);
};

export const getFinesPendientsByUserId = async (id) => {
  return pool.query(
    `SELECT count(user_id) AS "number_fines", sum(amount_due) AS "sum_fines" FROM fines 
WHERE user_id = ?`,
    [id]
  );
};

export const createFine = async (fineData) => {
  const { loan_id, user_id, fine_amount, amount_due } = fineData;
  const [result] = await pool.query(
    "INSERT INTO fines (loan_id, user_id, fine_amount, amount_due) VALUES (?, ?, ?, ?)",
    [loan_id, user_id, fine_amount, amount_due]
  );
  return result.insertId; // Devuelve el ID del nuevo libro creado
};

export const payFine = async (id, pay, status) => {
  const [result] = await pool.query(
    "UPDATE fines SET amount_due  = IFNULL(?, amount_due), status = IFNULL(?, status)WHERE id = ?",
    [pay, status, id]
  );
  return result.affectedRows; // Devuelve el número de filas afectadas
};
