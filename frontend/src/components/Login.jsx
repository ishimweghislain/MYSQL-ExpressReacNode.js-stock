import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/', { replace: true });
      } else {
        await api.post('/auth/register', {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        });
        setIsLogin(true);
        setFormData({ username: '', password: '', email: '' });
        setError('Registration successful! Please log in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? 'Login failed' : 'Registration failed'));
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', password: '', email: '' });
  };

  return (
    <div className="row justify-content-center">
      <style>
        {`
          /* Button and Link Colors */
          .btn-primary {
            background-color: #00796b;
            border-color: #00796b;
            color: #ffffff;
          }

          .btn-primary:hover {
            background-color: #004d40;
            border-color: #004d40;
            color: #ffffff;
          }

          .btn-link {
            color: #00796b;
          }

          .btn-link:hover {
            color: #004d40;
            text-decoration: underline;
          }
        `}
      </style>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            {error && (
              <div className={`alert ${isLogin && error.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100 mb-2">
                {isLogin ? 'Login' : 'Register'}
              </button>
              <button
                type="button"
                className="btn btn-link w-100"
                onClick={toggleForm}
              >
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;