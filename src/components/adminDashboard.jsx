import React, { useEffect, useState } from 'react'; // Added useState
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios to fetch data
import './css/adminDashboard.css';

function AdminDashboard({ isAdmin }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]); // Define recipes state

  useEffect(() => {
    if (!isAdmin) {
      navigate('/recipes'); // Redirect if not admin
    }

    // Fetch recipes
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes/all');
        setRecipes(response.data.data); // Assuming the recipes are in response.data.data
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
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
      <div className="recipe-list">
        <h2>Edit Existing Recipes</h2>
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
