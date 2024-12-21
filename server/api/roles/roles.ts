import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm vai trò
export const addRole = defineEventHandler(async (event) => {
  const { role_name } = await readBody(event);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO roles (role_name) VALUES (?)`,
    [role_name]
  );

  return {
    message: "Role added successfully",
    roleId: result.insertId,
  };
});

// Sửa vai trò (trừ vai trò Admin)
export const updateRole = defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  const { role_name } = await readBody(event);

  // Kiểm tra xem vai trò có phải là Admin không
  const [adminRole]: any = await pool.query(
    `SELECT role_name FROM roles WHERE role_id = ?`,
    [id]
  );
  if (adminRole?.role_name === "Admin") {
    throw createError({ statusCode: 403, message: "Cannot modify Admin role" });
  }

  await pool.query(`UPDATE roles SET role_name = ? WHERE role_id = ?`, [
    role_name,
    id,
  ]);

  return { message: "Role updated successfully" };
});

// Xóa vai trò (trừ vai trò Admin)
export const deleteRole = defineEventHandler(async (event) => {
  const { id } = getQuery(event);

  // Kiểm tra xem vai trò có phải là Admin không
  const [adminRole]: any = await pool.query(
    `SELECT role_name FROM roles WHERE role_id = ?`,
    [id]
  );
  if (adminRole?.role_name === "Admin") {
    throw createError({ statusCode: 403, message: "Cannot delete Admin role" });
  }

  await pool.query(`DELETE FROM roles WHERE role_id = ?`, [id]);
  return { message: "Role deleted successfully" };
});

// Tìm kiếm vai trò theo tên
export const searchRoleByName = defineEventHandler(async (event) => {
  const { name } = getQuery(event);
  const [rows] = await pool.query(
    `SELECT * FROM roles WHERE role_name LIKE ?`,
    [`%${name}%`]
  );

  return rows;
});

// Lấy toàn bộ danh sách vai trò
export const getAllRoles = defineEventHandler(async (event) => {
  const [rows] = await pool.query(`SELECT * FROM roles`);
  return rows;
});
