import { defineEventHandler, getQuery } from "h3";
import pool from "../../database/db";

// Xóa payment
export const deletePayment = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM payments WHERE payment_id = ?`, [id]);
  return { message: "Payment deleted successfully" };
});

// Xem tất cả payment
export const getAllPayments = defineEventHandler(async (event) => {
  const [rows] = await pool.query(
    "SELECT distinct * FROM payments JOIN events ON payments.event_id = events.event_id JOIN users ON payments.user_id = users.user_id"
  );
  return rows;
});

// Xem một payment cụ thể
export const getPaymentById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM payments JOIN events ON payments.event_id = events.event_id JOIN users ON payments.user_id = users.user_id WHERE payment_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Payment not found" });
  }

  return rows[0];
});
