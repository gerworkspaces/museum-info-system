import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm bài viết
export const addPost = defineEventHandler(async (event) => {
  const { user_id, title, content, post_date, post_type_id, post_image } =
    await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO posts (user_id, title, content, post_date, post_type_id, post_image) VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, title, content, post_date, post_type_id, post_image]
  );

  return {
    message: "Post added successfully",
    postId: result.insertId,
  };
});

// Sửa bài viết
export const updatePost = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { title, content, post_date, post_type_id, post_image } =
    await readBody(event);

  await pool.query(
    `UPDATE posts SET title = ?, content = ?, post_date = ?, post_type_id = ?, post_image = ? WHERE post_id = ?`,
    [title, content, post_date, post_type_id, post_image, id]
  );

  return { message: "Post updated successfully" };
});

// Xóa bài viết
export const deletePost = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  await pool.query(`DELETE FROM posts WHERE post_id = ?`, [id]);
  return { message: "Post deleted successfully" };
});

// Xem tất cả bài viết
export const getAllPosts = defineEventHandler(async (event) => {
  const [rows] = await pool.query("SELECT * FROM posts");
  return rows;
});

// Xem một bài viết cụ thể
export const getPostById = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const [rows]: [any[], any] = await pool.query(
    `SELECT * FROM posts WHERE post_id = ?`,
    [id]
  );

  if (rows.length === 0) {
    throw createError({ statusCode: 404, message: "Post not found" });
  }

  return rows[0];
});

// Tìm kiếm bài viết theo nội dung
export const searchPosts = defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  const [rows] = await pool.query(`SELECT * FROM posts WHERE content LIKE ?`, [
    `%${search}%`,
  ]);

  return rows;
});
