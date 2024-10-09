import React from 'react';
import { Link } from 'react-router-dom';
import './css/adminDashboard.css'; // Assuming the CSS is the same

const AdminNavBar = () => {
  return (
    <nav className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul className="nav-links">
        <li className="nav-item dropdown">
          <Link to="/admin/recipe-list" className="nav-link">Products</Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/admin/add-recipe" className="nav-link">Dodaj jelo</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
