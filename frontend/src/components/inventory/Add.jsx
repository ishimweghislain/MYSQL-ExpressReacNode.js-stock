import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function InventoryAdd() {
  const [formData, setFormData] = useState({ productid: '', quantity: '' });
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
      await api.post('/inventory', formData);
      navigate('/inventory');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add inventory');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Add Inventory</h2>
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
              min="0"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

export default InventoryAdd;