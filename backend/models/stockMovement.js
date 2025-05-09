const pool = require('../config/db');

class StockMovement {
  static async create({ productid, quantity, type, notes, userid }) {
    const [result] = await pool.query(
      'INSERT INTO stockMovements (productid, quantity, type, notes, userid) VALUES (?, ?, ?, ?, ?)',
      [productid, quantity, type, notes, userid]
    );
    return result.insertId;
  }

  static async findById(movementid) {
    const [rows] = await pool.query(
      'SELECT sm.*, p.name AS productName, u.username ' +
      'FROM stockMovements sm ' +
      'JOIN products p ON sm.productid = p.productid ' +
      'JOIN users u ON sm.userid = u.userid ' +
      'WHERE sm.movementid = ?',
      [movementid]
    );
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT sm.*, p.name AS productName, u.username ' +
      'FROM stockMovements sm ' +
      'JOIN products p ON sm.productid = p.productid ' +
      'JOIN users u ON sm.userid = u.userid'
    );
    return rows;
  }

  static async update(movementid, { productid, quantity, type, notes }) {
    await pool.query(
      'UPDATE stockMovements SET productid = ?, quantity = ?, type = ?, notes = ? WHERE movementid = ?',
      [productid, quantity, type, notes, movementid]
    );
  }

  static async delete(movementid) {
    await pool.query('DELETE FROM stockMovements WHERE movementid = ?', [movementid]);
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM stockMovements');
    return rows[0].count;
  }

  static async findRecent(limit) {
    const [rows] = await pool.query(
      'SELECT sm.*, p.name AS productName, u.username ' +
      'FROM stockMovements sm ' +
      'JOIN products p ON sm.productid = p.productid ' +
      'JOIN users u ON sm.userid = u.userid ' +
      'ORDER BY sm.createdat DESC LIMIT ?',
      [limit]
    );
    return rows;
  }

  static async findByDateRange(startDate, endDate, productid, type) {
    let query =
      'SELECT sm.*, p.name AS productName, u.username ' +
      'FROM stockMovements sm ' +
      'JOIN products p ON sm.productid = p.productid ' +
      'JOIN users u ON sm.userid = u.userid ' +
      'WHERE sm.createdat >= ? AND sm.createdat <= ?';
    const params = [
      new Date(startDate).toISOString().split('T')[0] + ' 00:00:00',
      new Date(endDate).toISOString().split('T')[0] + ' 23:59:59'
    ];

    if (productid) {
      query += ' AND sm.productid = ?';
      params.push(productid);
    }
    if (type) {
      query += ' AND sm.type = ?';
      params.push(type);
    }

    query += ' ORDER BY sm.createdat DESC';

    console.log('Executing query:', query, 'with params:', params);
    const [rows] = await pool.query(query, params);
    return rows;
  }
}

module.exports = StockMovement;