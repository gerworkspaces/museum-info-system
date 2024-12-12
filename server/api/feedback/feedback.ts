import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm feedback (không yêu cầu quyền admin)
export const addFeedback = defineEventHandler(async (event) => {
  const { user_id, content, full_name, email, subject } = await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO feedback (user_id, content, full_name, email, subject) VALUES (?, ?, ?, ?, ?)`,
    [user_id, content, full_name, email, subject]
  );

  return {
    message: "Feedback added successfully",
    feedbackId: result.insertId,
  };
});

// Xem tất cả feedback (yêu cầu quyền admin)
export const getAllFeedback = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM feedback");
  return rows;
});

// Xem một feedback cụ thể (yêu cầu quyền admin)
export const getFeedbackById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM feedback WHERE feedback_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Feedback not found" });
  }

  return rows[0];
});

// Xóa feedback (yêu cầu quyền admin)
export const deleteFeedback = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM feedback WHERE feedback_id = ?`, [id]);
  return { message: "Feedback deleted successfully" };
});
