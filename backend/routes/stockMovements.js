const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovementController');
const auth = require('../middleware/auth');

router.post('/', auth, stockMovementController.createStockMovement);
router.get('/', auth, stockMovementController.getStockMovements);
router.get('/:id', auth, stockMovementController.getStockMovement);
router.put('/:id', auth, stockMovementController.updateStockMovement);
router.delete('/:id', auth, stockMovementController.deleteStockMovement);

module.exports = router;