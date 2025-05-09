const Category = require('../models/category');
const { check, validationResult } = require('express-validator');

exports.createCategory = [
  check('name').notEmpty().withMessage('Name is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const categoryid = await Category.create(req.body);
      res.status(201).json({ message: 'Category created', categoryid });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateCategory = [
  check('name').notEmpty().withMessage('Name is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });

      await Category.update(req.params.id, req.body);
      res.json({ message: 'Category updated' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  },
];

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.delete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};