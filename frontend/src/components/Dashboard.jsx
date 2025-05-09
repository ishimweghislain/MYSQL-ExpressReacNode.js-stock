import { useState, useEffect } from 'react';
import api from './api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    lowStock: [],
    recentMovements: [],
    productQuantities: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      }
    };
    fetchDashboard();
  }, []);

  const { summary, lowStock, recentMovements, productQuantities } = dashboardData;

  return (
    <div>
      <style>
        {`
          /* Custom Dashboard Styles */
          .dashboard-container {
            background-color: #f5f6fa;
            padding: 2rem;
            border-radius: 10px;
            min-height: 100vh;
          }

          .dashboard-title {
            color: #00796b;
            font-weight: 600;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          /* Card Styles */
          .summary-card {
            background: linear-gradient(135deg, #00796b 0%, #004d40 100%);
            color: white;
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            margin-bottom: 1rem;
          }

          .summary-card:hover {
            transform: translateY(-5px);
          }

          .summary-card .card-title {
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          .summary-card .card-text {
            font-size: 1.5rem;
            font-weight: 700;
          }

          /* Table Styles */
          .dashboard-table {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .dashboard-table th {
            background-color: #00796b;
            color: white;
            font-weight: 500;
            padding: 1rem;
          }

          .dashboard-table td {
            padding: 1rem;
            vertical-align: middle;
          }

          .dashboard-table tr:hover {
            background-color: #e0f2f1;
          }

          /* Section Headers */
          .section-header {
            color: #004d40;
            font-weight: 500;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }

          /* Error Alert */
          .alert-danger {
            background-color: #ffebee;
            color: #c62828;
            border: none;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .summary-card {
              margin-bottom: 1.5rem;
            }

            .dashboard-container {
              padding: 1rem;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{summary.users || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Categories</h5>
                <p className="card-text">{summary.categories || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Products</h5>
                <p className="card-text">{summary.products || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Inventory Records</h5>
                <p className="card-text">{summary.inventoryRecords || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Stock Movements</h5>
                <p className="card-text">{summary.stockMovements || 0}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6">
            <div className="card summary-card">
              <div className="card-body text-center">
                <h5 className="card-title">Total Stock Value</h5>
                <p className="card-text">${(summary.totalStockValue || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Quantities Table */}
        <h3 className="section-header">Product Quantities</h3>
        {productQuantities.length > 0 ? (
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productQuantities.map((item) => (
                <tr key={item.productid}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No products in inventory.</p>
        )}

        {/* Low Stock Table */}
        <h3 className="section-header">Low Stock Products</h3>
        {lowStock.length > 0 ? (
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Current Stock</th>
                <th>Minimum Stock</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((item) => (
                <tr key={item.inventoryid}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.minimumStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No low stock products.</p>
        )}

        {/* Recent Stock Movements Table */}
        <h3 className="section-header">Recent Stock Movements</h3>
        {recentMovements.length > 0 ? (
          <table className="table dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>User</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((movement) => (
                <tr key={movement.movementid}>
                  <td>{movement.productName}</td>
                  <td>{movement.type}</td>
                  <td>{movement.quantity}</td>
                  <td>{movement.username}</td>
                  <td>{new Date(movement.createdat).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No recent stock movements.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;