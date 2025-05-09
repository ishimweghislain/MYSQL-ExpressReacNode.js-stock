import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function CategoryUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/categories/${id}`);
        setFormData({ name: response.data.name, description: response.data.description });
      } catch (err) {
        setError('Failed to load category');
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/categories/${id}`, formData);
      navigate('/categories');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Update Category</h2>
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
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryUpdate;