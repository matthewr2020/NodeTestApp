import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Assuming you store token in localStorage
      if (!token) {
        console.error('No token found');
        navigate('/login'); // Redirect to login if no token
        return;
      }
      try {
        const res = await axios.get('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
        if (error.response.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        } else if (error.response.status === 403) {
          navigate('/'); // Redirect to home if forbidden
        }
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleRoleChange = async (id, isAdmin) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/admin/users/${id}`, { isAdmin }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => user._id === id ? { ...user, isAdmin } : user));
    } catch (error) {
      console.error('Error updating user role', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleRoleChange(user._id, !user.isAdmin)}>
                  {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
