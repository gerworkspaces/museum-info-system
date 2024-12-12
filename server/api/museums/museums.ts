import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm bảo tàng
export const addMuseum = defineEventHandler(async (event) => {
  const {
    name,
    location,
    description,
    category_id,
    museum_image,
    open_time,
    close_time,
  } = await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO museums (name, location, description, category_id, museum_image, open_time, close_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      location,
      description,
      category_id,
      museum_image,
      open_time,
      close_time,
    ]
  );

  return {
    message: "Museum added successfully",
    museumId: result.insertId,
  };
});

// Sửa bảo tàng
export const updateMuseum = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const {
    name,
    location,
    description,
    category_id,
    museum_image,
    open_time,
    close_time,
  } = await readBody(event);

  await pool.query(
    `UPDATE museums SET name = ?, location = ?, description = ?, category_id = ?, museum_image = ?, open_time = ?, close_time = ? WHERE museum_id = ?`,
    [
      name,
      location,
      description,
      category_id,
      museum_image,
      open_time,
      close_time,
      id,
    ]
  );

  return { message: "Museum updated successfully" };
});

// Xóa bảo tàng
export const deleteMuseum = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM museums WHERE museum_id = ?`, [id]);
  return { message: "Museum deleted successfully" };
});

// Xem tất cả bảo tàng
export const getAllMuseums = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM museums");
  return rows;
});

// Xem một bảo tàng cụ thể
export const getMuseumById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM museums WHERE museum_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Museum not found" });
  }

  return rows[0];
});

// Tìm kiếm bảo tàng
export const searchMuseums = defineEventHandler(async (event) => {
  const { query, category_id } = getQuery(event);

  let sql = `SELECT * FROM museums WHERE 1=1`;
  const params: any[] = [];

  if (query) {
    sql += ` AND (name LIKE ? OR location LIKE ? OR description LIKE ?)`;
    const likeQuery = `%${query}%`;
    params.push(likeQuery, likeQuery, likeQuery);
  }

  if (category_id) {
    sql += ` AND category_id = ?`;
    params.push(category_id);
  }

  const [rows] = await pool.query(sql, params);
  return rows;
});
