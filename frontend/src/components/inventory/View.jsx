import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function InventoryView() {
  const [inventories, setInventories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await api.get('/inventory');
        setInventories(response.data);
      } catch (err) {
        setError('Failed to load inventories');
      }
    };
    fetchInventories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory record?')) {
      try {
        await api.delete(`/inventory/${id}`);
        setInventories(inventories.filter((inventory) => inventory.inventoryid !== id));
      } catch (err) {
        setError('Failed to delete inventory');
      }
    }
  };

  return (
    <div>
      <h2>Inventory</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/inventory/add" className="btn btn-primary mb-3">
        Add Inventory
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.inventoryid}>
              <td>{inventory.productName}</td>
              <td>{inventory.quantity}</td>
              <td>{new Date(inventory.createdat).toLocaleString()}</td>
              <td>{new Date(inventory.updatedat).toLocaleString()}</td>
              <td>
                <Link
                  to={`/inventory/update/${inventory.inventoryid}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(inventory.inventoryid)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryView;