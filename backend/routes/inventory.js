const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

router.post('/', auth, inventoryController.create);
router.get('/', auth, inventoryController.getAll);
router.get('/:id', auth, inventoryController.getById);
router.put('/:id', auth, inventoryController.update);
router.delete('/:id', auth, inventoryController.delete);

module.exports = router;