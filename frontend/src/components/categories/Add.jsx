import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CategoryAdd() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', formData);
      navigate('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Add Category</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryAdd;