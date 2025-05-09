const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, categoryController.createCategory);
router.get('/', auth, categoryController.getCategories);
router.get('/:id', auth, categoryController.getCategory);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;