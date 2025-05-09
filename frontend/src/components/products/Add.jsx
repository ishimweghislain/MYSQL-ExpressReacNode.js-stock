import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ProductAdd() {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    minimumStock: '',
    maximumStock: '',
    categoryid: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Add Product</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="sku" className="form-label">
              SKU
            </label>
            <input
              type="text"
              className="form-control"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="minimumStock" className="form-label">
              Minimum Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="minimumStock"
              name="minimumStock"
              value={formData.minimumStock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maximumStock" className="form-label">
              Maximum Stock
            </label>
            <input
              type="number"
              className="form-control"
              id="maximumStock"
              name="maximumStock"
              value={formData.maximumStock}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryid" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="categoryid"
              name="categoryid"
              value={formData.categoryid}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;