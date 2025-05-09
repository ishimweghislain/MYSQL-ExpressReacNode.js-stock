const pool = require('../config/db');

class Product {
  static async create({ sku, name, price, minimumStock, maximumStock, categoryid }) {
    const [result] = await pool.query(
      'INSERT INTO products (sku, name, price, minimumStock, maximumStock, categoryid) VALUES (?, ?, ?, ?, ?, ?)',
      [sku, name, price, minimumStock, maximumStock, categoryid]
    );
    return result.insertId;
  }

  static async findById(productid) {
    const [rows] = await pool.query(
      'SELECT p.*, c.name AS categoryName FROM products p LEFT JOIN categories c ON p.categoryid = c.categoryid WHERE p.productid = ?',
      [productid]
    );
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT p.*, c.name AS categoryName FROM products p LEFT JOIN categories c ON p.categoryid = c.categoryid'
    );
    return rows;
  }

  static async update(productid, { sku, name, price, minimumStock, maximumStock, categoryid }) {
    await pool.query(
      'UPDATE products SET sku = ?, name = ?, price = ?, minimumStock = ?, maximumStock = ?, categoryid = ? WHERE productid = ?',
      [sku, name, price, minimumStock, maximumStock, categoryid, productid]
    );
  }

  static async delete(productid) {
    await pool.query('DELETE FROM products WHERE productid = ?', [productid]);
  }

  static async count() {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
    return rows[0].count;
  }
}

module.exports = Product;