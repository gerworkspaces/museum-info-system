import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm sự kiện
export const addEvent = defineEventHandler(async (event) => {
  const { event_name, event_date, description, museum_id, event_image } =
    await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO events (event_name, event_date, description, museum_id, event_image) VALUES (?, ?, ?, ?, ?)`,
    [event_name, event_date, description, museum_id, event_image]
  );

  return {
    message: "Event added successfully",
    eventId: result.insertId,
  };
});

// Sửa sự kiện
export const updateEvent = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { event_name, event_date, description, museum_id, event_image } =
    await readBody(event);

  await pool.query(
    `UPDATE events SET event_name = ?, event_date = ?, description = ?, museum_id = ?, event_image = ? WHERE event_id = ?`,
    [event_name, event_date, description, museum_id, event_image, id]
  );

  return { message: "Event updated successfully" };
});

// Xóa sự kiện
export const deleteEvent = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM events WHERE event_id = ?`, [id]);
  return { message: "Event deleted successfully" };
});

// Xem tất cả sự kiện
export const getAllEvents = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM events");
  return rows;
});

// Xem một sự kiện cụ thể
export const getEventById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM events WHERE event_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Event not found" });
  }

  return rows[0];
});

// Tìm kiếm sự kiện
export const searchEvents = defineEventHandler(async (event) => {
  const { categories, minPrice, maxPrice, tags, times, organizations } =
    getQuery(event);

  let query = "SELECT * FROM events WHERE 1=1";
  const params: any[] = [];

  if (categories) {
    query += " AND category_id IN (?)";
    params.push(categories);
  }
  if (minPrice) {
    query += " AND price >= ?";
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND price <= ?";
    params.push(maxPrice);
  }

  const [rows] = await pool.query(query, params);
  return rows;
});

// Thêm đánh giá sự kiện
export const addReviewEvent = defineEventHandler(async (event) => {
  const { event_id, user_id, subject, email, full_name, content, rating } =
    await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO review_event (event_id, user_id, subject, email, full_name, content, rating) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [event_id, user_id, subject, email, full_name, content, rating]
  );

  return {
    message: "Review added successfully",
    reviewId: result.insertId,
  };
});

// Xem tất cả đánh giá sự kiện
export const getAllReviews = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM review_event");
  return rows;
});

// Xóa đánh giá sự kiện
export const deleteReviewEvent = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  await pool.query(`DELETE FROM review_event WHERE review_id = ?`, [id]);
  return { message: "Review deleted successfully" };
});
