const Inventory = require('../models/inventory');
const { check, validationResult } = require('express-validator');

exports.create = [
  check('productid').isInt().withMessage('Product ID must be an integer'),
  check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { productid, quantity } = req.body;
      const inventoryid = await Inventory.create({ productid, quantity });
      res.status(201).json({ message: 'Inventory created', inventoryid });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];

exports.getAll = async (req, res) => {
  try {
    const inventories = await Inventory.findAll();
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.update = [
  check('productid').isInt().withMessage('Product ID must be an integer'),
  check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { productid, quantity } = req.body;
      const inventory = await Inventory.findById(req.params.id);
      if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
      await Inventory.update(req.params.id, { productid, quantity });
      res.json({ message: 'Inventory updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];

exports.delete = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
    await Inventory.delete(req.params.id);
    res.json({ message: 'Inventory deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};