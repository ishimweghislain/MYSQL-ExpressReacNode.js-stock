import { Link, useNavigate } from 'react-router-dom';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <style>
        {`
          /* Custom Navbar Styles */
          .custom-navbar {
            background: linear-gradient(90deg, #00796b 0%, #004d40 100%);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 0.75rem 1rem;
          }

          .custom-navbar .navbar-brand {
            color: #ffffff;
            font-weight: 700;
            font-size: 1.5rem;
            transition: color 0.2s;
          }

          .custom-navbar .navbar-brand:hover {
            color: #e0f2f1;
          }

          .custom-navbar .nav-link {
            color: #ffffff !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            position: relative;
            display: flex;
            align-items: center;
            transition: color 0.2s;
          }

          /* Underline Animation */
          .custom-navbar .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background-color: #e0f2f1;
            transition: width 0.3s ease, left 0.3s ease;
          }

          .custom-navbar .nav-link:hover::after {
            width: 100%;
            left: 0;
          }

          .custom-navbar .nav-link:hover {
            color: #e0f2f1 !important;
          }

          /* Active Link */
          .custom-navbar .nav-link.active {
            color: #e0f2f1 !important;
          }

          .custom-navbar .nav-link.active::after {
            width: 100%;
            left: 0;
            background-color: #e0f2f1;
          }

          /* Icon Styling */
          .custom-navbar .nav-link .bi {
            margin-right: 0.5rem;
            font-size: 1.2rem;
          }

          .custom-navbar .btn-link {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            position: relative;
            display: flex;
            align-items: center;
            transition: color 0.2s;
          }

          .custom-navbar .btn-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 50%;
            background-color: #e0f2f1;
            transition: width 0.3s ease, left 0.3s ease;
          }

          .custom-navbar .btn-link:hover::after {
            width: 100%;
            left: 0;
          }

          .custom-navbar .btn-link:hover {
            color: #e0f2f1;
          }

          .custom-navbar .btn-link .bi {
            margin-right: 0.5rem;
            font-size: 1.2rem;
          }

          .custom-navbar .navbar-toggler {
            border-color: #ffffff;
          }

          .custom-navbar .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.95%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          }

          /* Responsive Adjustments */
          @media (max-width: 991px) {
            .custom-navbar .navbar-nav {
              padding: 1rem 0;
            }

            .custom-navbar .nav-link,
            .custom-navbar .btn-link {
              padding: 0.75rem 1.5rem;
              justify-content: flex-start;
            }

            .custom-navbar .nav-link::after,
            .custom-navbar .btn-link::after {
              bottom: 0.25rem;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Tectona Inventory
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isAuthenticated ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="bi bi-speedometer2"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person-fill"></i> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    <i className="bi bi-tags-fill"></i> Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    <i className="bi bi-box-seam"></i> Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventory">
                    <i className="bi bi-inbox-fill"></i> Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stockMovements">
                    <i className="bi bi-arrow-left-right"></i> Stock Movements
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reports">
                    <i className="bi bi-file-earmark-bar-graph"></i> Reports
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;