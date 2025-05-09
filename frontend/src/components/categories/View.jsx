import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function CategoryView() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter((category) => category.categoryid !== id));
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/categories/add" className="btn btn-primary mb-3">
        Add Category
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryid}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Link
                  to={`/categories/update/${category.categoryid}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(category.categoryid)}
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

export default CategoryView;