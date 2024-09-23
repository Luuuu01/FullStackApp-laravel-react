import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './css/adminDashboard.css';

function AdminDashboard({ isAdmin }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Admin Status:", isAdmin);
    if (!isAdmin) {
      navigate('/recipes'); // Redirect to /recipes if not an admin
    }
  }, [isAdmin, navigate]);

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="title">Admin Panel</h1>
        <ul className="nav-links">
          <li>
            <Link to="/admin/add-recipe" className="nav-link">Dodaj jelo</Link>
          </li>
          <li>
            <Link to="/admin/delete-recipe" className="nav-link">Obriši jelo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;
