import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/adminDashboard.css'; // Assuming the CSS is the same
import { FaBoxArchive } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";

const AdminNavBar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <h2>Dashboard</h2>
      <ul className="nav-links">
        <li className="nav-item dropdown">
          <Link 
            to="/admin/recipe-list" 
            className={`nav-link ${location.pathname === "/admin/recipe-list" ? "active" : ""}`}
          >
            <FaBoxArchive style={{ marginTop: "2px" }} /> Products
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link 
                to="/admin/add-recipe" 
                className={`nav-linkk ${location.pathname === "/admin/add-recipe" ? "active" : ""}`}
              >
                Add product
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link 
            to="/admin/media-library" 
            className={`nav-link ${location.pathname === "/admin/media-library" ? "active" : ""}`}
          >
            <MdPermMedia /> Media
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;