import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import { ResultSetHeader } from "mysql2/promise";

// Thêm loại bài viết
export const addPostType = defineEventHandler(async (event) => {
  const { post_type_id, post_type_name } = await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO post_types (post_type_id, post_type_name) VALUES (?, ?)`,
    [post_type_id, post_type_name]
  );

  return {
    message: "Post type added successfully",
    postTypeId: result.insertId,
  };
});

// Sửa loại bài viết
export const updatePostType = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { post_type_name } = await readBody(event);

  await pool.query(
    `UPDATE post_types SET post_type_name = ? WHERE post_type_id = ?`,
    [post_type_name, id]
  );

  return { message: "Post type updated successfully" };
});

// Xóa loại bài viết
export const deletePostType = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM post_types WHERE post_type_id = ?`, [id]);
  return { message: "Post type deleted successfully" };
});

// Xem tất cả loại bài viết
export const getAllPostTypes = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM post_types");
  return rows;
});

// Xem một loại bài viết cụ thể
export const getPostTypeById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM post_types WHERE post_type_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Post type not found" });
  }

  return rows[0];
});
