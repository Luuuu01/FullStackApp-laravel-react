import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/adminDashboard.css';
import AdminNavBar from './adminNavBar';

function AdminDashboard({ isAdmin }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/recipes'); // Redirect if not admin
    }

    // Fetch recipes (GET all recipes when visiting "Products" page)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes/all');
        setRecipes(response.data.data); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [isAdmin, navigate]);

  return (
    <div className="admin-dashboard">
      <AdminNavBar/>

      <div className="content">
        <h2>All Recipes</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {recipe.name} - <Link to={`/admin/edit-recipe/${recipe.id}`} className="edit-link">Izmeni</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
