const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');
const Inventory = require('../models/inventory');
const StockMovement = require('../models/stockMovement');

exports.getDashboard = async (req, res) => {
  try {
    // Get counts
    const userCount = await User.count();
    const categoryCount = await Category.count();
    const productCount = await Product.count();
    const inventoryCount = await Inventory.count();
    const stockMovementCount = await StockMovement.count();

    // Get low stock products
    const lowStock = await Inventory.findLowStock();

    // Get recent stock movements (last 5)
    const recentMovements = await StockMovement.findRecent(5);

    // Get total stock value
    const totalStockValue = await Inventory.getTotalStockValue();

    // Get product quantities
    const productQuantities = await Inventory.findAll();

    res.json({
      summary: {
        users: userCount,
        categories: categoryCount,
        products: productCount,
        inventoryRecords: inventoryCount,
        stockMovements: stockMovementCount,
        totalStockValue,
      },
      lowStock,
      recentMovements,
      productQuantities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};