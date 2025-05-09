import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import UserAdd from './components/users/Add';
import UserUpdate from './components/users/Update';
import UserView from './components/users/View';
import CategoryAdd from './components/categories/Add';
import CategoryUpdate from './components/categories/Update';
import CategoryView from './components/categories/View';
import ProductAdd from './components/products/Add';
import ProductUpdate from './components/products/Update';
import ProductView from './components/products/View';
import StockMovementAdd from './components/stockMovements/Add';
import StockMovementUpdate from './components/stockMovements/Update';
import StockMovementView from './components/stockMovements/View';
import InventoryAdd from './components/inventory/Add';
import InventoryUpdate from './components/inventory/Update';
import InventoryView from './components/inventory/View';
import Dashboard from './components/Dashboard';
import Report from './components/Report';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={isAuthenticated ? <InventoryView /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/add"
            element={isAuthenticated ? <UserAdd /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/update/:id"
            element={isAuthenticated ? <UserUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <UserView /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/add"
            element={isAuthenticated ? <CategoryAdd /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/update/:id"
            element={isAuthenticated ? <CategoryUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={isAuthenticated ? <CategoryView /> : <Navigate to="/login" />}
          />
          <Route
            path="/products/add"
            element={isAuthenticated ? <ProductAdd /> : <Navigate to="/login" />}
          />
          <Route
            path="/products/update/:id"
            element={isAuthenticated ? <ProductUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isAuthenticated ? <ProductView /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockMovements/add"
            element={isAuthenticated ? <StockMovementAdd /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockMovements/update/:id"
            element={isAuthenticated ? <StockMovementUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockMovements"
            element={isAuthenticated ? <StockMovementView /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory/add"
            element={isAuthenticated ? <InventoryAdd /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory/update/:id"
            element={isAuthenticated ? <InventoryUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/inventory"
            element={isAuthenticated ? <InventoryView /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={isAuthenticated ? <Report /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;