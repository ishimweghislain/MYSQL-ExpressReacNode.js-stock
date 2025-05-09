import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function ProductView() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((product) => product.productid !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/products/add" className="btn btn-primary mb-3">
        Add Product
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Minimum Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productid}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.categoryName || 'N/A'}</td>
              <td>${product.price}</td>
              <td>{product.minimumStock}</td>
              <td>
                <Link
                  to={`/products/update/${product.productid}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.productid)}
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

export default ProductView;