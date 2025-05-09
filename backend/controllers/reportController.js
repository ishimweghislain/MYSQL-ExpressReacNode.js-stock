const StockMovement = require('../models/stockMovement');
const { check, validationResult } = require('express-validator');

exports.getReport = [
  check('startDate').isISO8601().toDate().withMessage('Start date must be a valid date'),
  check('endDate')
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date')
    .custom((endDate, { req }) => {
      if (new Date(endDate) < new Date(req.query.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  check('productid').optional().isInt().withMessage('Product ID must be an integer'),
  check('type').optional().isIn(['IN', 'OUT']).withMessage('Type must be IN or OUT'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { startDate, endDate, productid, type } = req.query;
      const movements = await StockMovement.findByDateRange(startDate, endDate, productid, type);
      res.json(movements);
    } catch (error) {
      console.error('Report error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];