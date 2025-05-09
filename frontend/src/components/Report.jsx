import { useState, useEffect } from 'react';
import api from './api';

function Report() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    productid: '',
    type: '',
  });
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const params = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        ...(formData.productid && { productid: formData.productid }),
        ...(formData.type && { type: formData.type }),
      };
      console.log('Sending report request with params:', params);
      const response = await api.get('/reports', { params });
      setMovements(response.data);
    } catch (err) {
      console.error('Report request error:', err);
      setError(err.response?.data?.message || 'Failed to load report');
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stock Movement Report</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="productid" className="form-label">
              Product
            </label>
            <select
              className="form-select"
              id="productid"
              name="productid"
              value={formData.productid}
              onChange={handleChange}
            >
              <option value="">All Products</option>
              {products.map((product) => (
                <option key={product.productid} value={product.productid}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">All Types</option>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {movements.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.movementid}>
                <td>{movement.productName}</td>
                <td>{movement.type}</td>
                <td>{movement.quantity}</td>
                <td>{movement.username}</td>
                <td>{movement.notes || 'N/A'}</td>
                <td>{new Date(movement.createdat).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No stock movements found for the selected date range.</p>
      )}
    </div>
  );
}

export default Report;