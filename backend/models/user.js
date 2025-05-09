const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ username, password, email, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, email, role]
    );
    return result.insertId;
  }

  static async findById(userid) {
    const [rows] = await pool.query('SELECT * FROM users WHERE userid = ?', [userid]);
    return rows[0];
  }

  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async update(userid, { username, password, email, role }) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await pool.query(
      'UPDATE users SET username = ?, password = COALESCE(?, password), email = ?, role = ? WHERE userid = ?',
      [username, hashedPassword, email, role, userid]
    );
  }

  static async delete(userid) {
    await pool.query('DELETE FROM users WHERE userid = ?', [userid]);
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    return rows[0].count;
  }
}

module.exports = User;