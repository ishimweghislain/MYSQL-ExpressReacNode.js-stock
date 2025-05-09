import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function UserView() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((user) => user.userid !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/users/add" className="btn btn-primary mb-3">
        Add User
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdat).toLocaleString()}</td>
              <td>
                <Link to={`/users/update/${user.userid}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.userid)}
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

export default UserView;