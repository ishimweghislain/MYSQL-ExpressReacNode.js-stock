const pool = require('../config/db');

class Inventory {
  static async create({ productid, quantity }) {
    const [result] = await pool.query(
      'INSERT INTO inventory (productid, quantity) VALUES (?, ?)',
      [productid, quantity]
    );
    return result.insertId;
  }

  static async findById(inventoryid) {
    const [rows] = await pool.query(
      'SELECT i.*, p.name AS productName FROM inventory i JOIN products p ON i.productid = p.productid WHERE i.inventoryid = ?',
      [inventoryid]
    );
    return rows[0];
  }

  static async findByProductId(productid) {
    const [rows] = await pool.query(
      'SELECT * FROM inventory WHERE productid = ?',
      [productid]
    );
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT i.*, p.name AS productName FROM inventory i JOIN products p ON i.productid = p.productid'
    );
    return rows;
  }

  static async update(inventoryid, { productid, quantity }) {
    await pool.query(
      'UPDATE inventory SET productid = ?, quantity = ?, updatedat = CURRENT_TIMESTAMP WHERE inventoryid = ?',
      [productid, quantity, inventoryid]
    );
  }

  static async delete(inventoryid) {
    await pool.query('DELETE FROM inventory WHERE inventoryid = ?', [inventoryid]);
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM inventory');
    return rows[0].count;
  }

  static async findLowStock() {
    const [rows] = await pool.query(
      'SELECT i.*, p.name AS productName, p.minimumStock ' +
      'FROM inventory i JOIN products p ON i.productid = p.productid ' +
      'WHERE i.quantity <= p.minimumStock'
    );
    return rows;
  }

  static async getTotalStockValue() {
    const [rows] = await pool.query(
      'SELECT COALESCE(SUM(i.quantity * p.price), 0) as totalValue ' +
      'FROM inventory i JOIN products p ON i.productid = p.productid'
    );
    return Number(rows[0].totalValue);
  }
}

module.exports = Inventory;