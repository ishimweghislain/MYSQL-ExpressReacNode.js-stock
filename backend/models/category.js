const pool = require('../config/db');

class Category {
  static async create({ name, description }) {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result.insertId;
  }

  static async findById(categoryid) {
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE categoryid = ?',
      [categoryid]
    );
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
  }

  static async update(categoryid, { name, description }) {
    await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE categoryid = ?',
      [name, description, categoryid]
    );
  }

  static async delete(categoryid) {
    await pool.query('DELETE FROM categories WHERE categoryid = ?', [categoryid]);
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM categories');
    return rows[0].count;
  }
}

module.exports = Category;