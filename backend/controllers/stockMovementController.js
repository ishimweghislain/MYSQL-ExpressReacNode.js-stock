const StockMovement = require('../models/stockMovement');
const Inventory = require('../models/inventory');
const Product = require('../models/product');
const pool = require('../config/db');
const { check, validationResult } = require('express-validator');

exports.createStockMovement = [
  check('productid').isInt().withMessage('Product ID must be an integer'),
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  check('type').isIn(['IN', 'OUT']).withMessage('Type must be IN or OUT'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { productid, quantity, type, notes } = req.body;
      const userid = req.user.userid;

      // Verify product exists
      const product = await Product.findById(productid);
      if (!product) {
        await connection.rollback();
        return res.status(404).json({ message: 'Product not found' });
      }

      // Get or create inventory record
      let inventory = await Inventory.findByProductId(productid);
      if (!inventory) {
        const inventoryid = await Inventory.create({ productid, quantity: 0 });
        inventory = { inventoryid, productid, quantity: 0 };
      }

      // Validate stock constraints
      if (type === 'OUT') {
        if (inventory.quantity < quantity) {
          await connection.rollback();
          return res.status(400).json({ message: `Insufficient stock. Available: ${inventory.quantity}` });
        }
        if (inventory.quantity - quantity < product.minimumStock) {
          await connection.rollback();
          return res.status(400).json({ message: `Cannot reduce stock below minimum (${product.minimumStock})` });
        }
      }
      if (type === 'IN') {
        if (inventory.quantity + quantity > product.maximumStock) {
          await connection.rollback();
          return res.status(400).json({ message: `Cannot exceed maximum stock (${product.maximumStock})` });
        }
      }

      // Update inventory
      const newQuantity = type === 'IN' ? inventory.quantity + quantity : inventory.quantity - quantity;
      await Inventory.update(inventory.inventoryid, { productid, quantity: newQuantity });

      // Create stock movement
      const movementid = await StockMovement.create({ productid, quantity, type, notes, userid });

      await connection.commit();
      res.status(201).json({ message: 'Stock movement created', movementid });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
      connection.release();
    }
  },
];

exports.getStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.findAll();
    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStockMovement = async (req, res) => {
  try {
    const movement = await StockMovement.findById(req.params.id);
    if (!movement) return res.status(404).json({ message: 'Stock movement not found' });
    res.json(movement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateStockMovement = [
  check('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  check('type').isIn(['IN', 'OUT']).withMessage('Type must be IN or OUT'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const { productid, quantity, type, notes } = req.body;
      const movement = await StockMovement.findById(req.params.id);
      if (!movement) {
        await connection.rollback();
        return res.status(404).json({ message: 'Stock movement not found' });
      }

      // Verify product exists
      const product = await Product.findById(productid || movement.productid);
      if (!product) {
        await connection.rollback();
        return res.status(404).json({ message: 'Product not found' });
      }

      // Get inventory record
      const inventory = await Inventory.findByProductId(productid || movement.productid);
      if (!inventory) {
        await connection.rollback();
        return res.status(400).json({ message: 'No inventory record found for this product' });
      }

      // Revert previous movement effect
      const revertQuantity = movement.type === 'IN' ? inventory.quantity - movement.quantity : inventory.quantity + movement.quantity;

      // Validate stock constraints
      if (type === 'OUT') {
        if (revertQuantity < quantity) {
          await connection.rollback();
          return res.status(400).json({ message: `Insufficient stock. Available: ${revertQuantity}` });
        }
        if (revertQuantity - quantity < product.minimumStock) {
          await connection.rollback();
          return res.status(400).json({ message: `Cannot reduce stock below minimum (${product.minimumStock})` });
        }
      }
      if (type === 'IN') {
        if (revertQuantity + quantity > product.maximumStock) {
          await connection.rollback();
          return res.status(400).json({ message: `Cannot exceed maximum stock (${product.maximumStock})` });
        }
      }

      // Update inventory
      const newQuantity = type === 'IN' ? revertQuantity + quantity : revertQuantity - quantity;
      await Inventory.update(inventory.inventoryid, { productid: productid || movement.productid, quantity: newQuantity });

      // Update stock movement
      await StockMovement.update(req.params.id, { productid: productid || movement.productid, quantity, type, notes });

      await connection.commit();
      res.json({ message: 'Stock movement updated' });
    } catch (error) {
      await connection.rollback();
      res.status(500).json({ message: 'Server error', error: error.message });
    } finally {
      connection.release();
    }
  },
];

exports.deleteStockMovement = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const movement = await StockMovement.findById(req.params.id);
    if (!movement) {
      await connection.rollback();
      return res.status(404).json({ message: 'Stock movement not found' });
    }

    // Revert inventory effect
    const inventory = await Inventory.findByProductId(movement.productid);
    if (inventory) {
      const newQuantity = movement.type === 'IN' ? inventory.quantity - movement.quantity : inventory.quantity + movement.quantity;
      await Inventory.update(inventory.inventoryid, { productid: movement.productid, quantity: newQuantity });
    }

    await StockMovement.delete(req.params.id);

    await connection.commit();
    res.json({ message: 'Stock movement deleted' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
};