import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function StockMovementView() {
  const [movements, setMovements] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await api.get('/stockMovements');
        setMovements(response.data);
      } catch (err) {
        setError('Failed to load stock movements');
      }
    };
    fetchMovements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock movement?')) {
      try {
        await api.delete(`/stockMovements/${id}`);
        setMovements(movements.filter((movement) => movement.movementid !== id));
      } catch (err) {
        setError('Failed to delete stock movement');
      }
    }
  };

  return (
    <div>
      <h2>Stock Movements</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/stockMovements/add" className="btn btn-primary mb-3">
        Add Stock Movement
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>User</th>
            <th>Notes</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement) => (
            <tr key={movement.movementid}>
              <td>{movement.productName}</td>
              <td>{movement.quantity}</td>
              <td>{movement.type}</td>
              <td>{movement.username}</td>
              <td>{movement.notes || 'N/A'}</td>
              <td>{new Date(movement.createdat).toLocaleString()}</td>
              <td>
                <Link
                  to={`/stockMovements/update/${movement.movementid}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(movement.movementid)}
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

export default StockMovementView;