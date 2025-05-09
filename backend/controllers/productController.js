const Product = require('../models/product');
const { check, validationResult } = require('express-validator');

exports.createProduct = [
  check('sku').notEmpty().withMessage('SKU is required'),
  check('name').notEmpty().withMessage('Name is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('minimumStock').isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
  check('maximumStock').isInt({ min: 1 }).withMessage('Maximum stock must be a positive integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { sku, name, price, minimumStock, maximumStock, categoryid } = req.body;
      const productid = await Product.create({ sku, name, price, minimumStock, maximumStock, categoryid });
      res.status(201).json({ message: 'Product created', productid });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProduct = [
  check('sku').notEmpty().withMessage('SKU is required'),
  check('name').notEmpty().withMessage('Name is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  check('minimumStock').isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
  check('maximumStock').isInt({ min: 1 }).withMessage('Maximum stock must be a positive integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { sku, name, price, minimumStock, maximumStock, categoryid } = req.body;
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await Product.update(req.params.id, { sku, name, price, minimumStock, maximumStock, categoryid });
      res.json({ message: 'Product updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await Product.delete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};