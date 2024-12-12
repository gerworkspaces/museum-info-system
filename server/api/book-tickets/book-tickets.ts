import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import { ResultSetHeader } from "mysql2/promise";

// Thêm đặt vé
export const addBooking = defineEventHandler(async (event) => {
  const { user_id, event_id, booking_date } = await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO book_tickets (user_id, event_id, booking_date) VALUES (?, ?, ?)`,
    [user_id, event_id, booking_date]
  );

  return {
    message: "Booking added successfully",
    bookingId: result.insertId,
  };
});

// Sửa đặt vé
export const updateBooking = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { user_id, event_id, booking_date } = await readBody(event);

  await pool.query(
    `UPDATE book_tickets SET user_id = ?, event_id = ?, booking_date = ? WHERE booking_id = ?`,
    [user_id, event_id, booking_date, id]
  );

  return { message: "Booking updated successfully" };
});

// Xóa đặt vé
export const deleteBooking = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM book_tickets WHERE booking_id = ?`, [id]);
  return { message: "Booking deleted successfully" };
});

// Xem tất cả đặt vé
export const getAllBookings = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM book_tickets");
  return rows;
});

// Tìm kiếm đặt vé theo các tham số
export const searchBookings = defineEventHandler(async (event) => {
  const { categories, minPrice, maxPrice, tags, times, organizations } =
    getQuery(event);

  let query = `SELECT * FROM book_tickets WHERE 1=1`;
  const params: any[] = [];

  // Thêm điều kiện tìm kiếm cho từng tham số
  if (categories) {
    query += ` AND category_id IN (?)`; // Giả sử bạn có một bảng categories liên kết với book_tickets
    params.push(categories);
  }
  if (minPrice) {
    query += ` AND price >= ?`; // Giả sử bạn có cột price trong book_tickets
    params.push(minPrice);
  }
  if (maxPrice) {
    query += ` AND price <= ?`;
    params.push(maxPrice);
  }
  if (tags && typeof tags === 'string') {
    query += ` AND tags IN (?)`; // Giả sử bạn có một cột tags trong book_tickets
    params.push(tags.split(","));
  }
  if (times && typeof times === 'string') {
    query += ` AND times IN (?)`; // Giả sử bạn có một cột times trong book_tickets
    params.push(times.split(","));
  }
  if (organizations && typeof organizations === 'string') {
    query += ` AND organization_id IN (?)`; // Giả sử bạn có một cột organization_id trong book_tickets
    params.push(organizations.split(","));
  }

  const [rows] = await pool.query(query, params);
  return rows;
});
