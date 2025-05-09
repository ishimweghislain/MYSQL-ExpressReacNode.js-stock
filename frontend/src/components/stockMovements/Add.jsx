import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function StockMovementAdd() {
  const [formData, setFormData] = useState({ productid: '', quantity: '', type: 'IN', notes: '' });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    try {
      await api.post('/stockMovements', formData);
      navigate('/stockMovements');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add stock movement');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Add Stock Movement</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productid" className="form-label">
              Product
            </label>
            <select
              className="form-select"
              id="productid"
              name="productid"
              value={formData.productid}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.productid} value={product.productid}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Stock Movement
          </button>
        </form>
      </div>
    </div>
  );
}

export default StockMovementAdd;