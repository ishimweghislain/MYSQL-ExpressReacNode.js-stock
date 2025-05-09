const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/', auth, productController.createProduct);
router.get('/', auth, productController.getProducts);
router.get('/:id', auth, productController.getProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;