import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavBar from './adminNavBar';
import './css/recipeList.css'; 
import { FaImage, FaSortUp, FaSortDown } from "react-icons/fa6";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' }); // Default sorting

  useEffect(() => {
    axios.get(`/api/recipes?page=${currentPage}`)
        .then((res) => {
            setRecipes(res.data.data);
            setTotalPages(res.data.meta.last_page);
        })
        .catch((err) => {
            console.error("Error fetching recipes:", err);
            setError("There was an issue loading recipes.");
        });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (recipeId) => {
    const newSelectedRecipes = new Set(selectedRecipes);
    if (newSelectedRecipes.has(recipeId)) {
      newSelectedRecipes.delete(recipeId);
    } else {
      newSelectedRecipes.add(recipeId);
    }
    setSelectedRecipes(newSelectedRecipes);
  };

  const handleBulkDelete = () => {
    if (selectedRecipes.size === 0) {
      alert("No recipes selected for deletion.");
      return;
    }
    if (window.confirm('Are you sure you want to delete the selected recipes?')) {
      selectedRecipes.forEach(recipeId => {
        axios.delete(`/api/recipes/${recipeId}`)
          .then(() => {
            alert(`Recipe ${recipeId} deleted`);
            setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
          })
          .catch(error => {
            console.error('Error deleting recipe:', error);
          });
      });
      setSelectedRecipes(new Set());
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-arrow"
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    );  
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={1 === currentPage ? "active-page" : ""}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<span key="dots-start">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "active-page" : ""}
          >
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="dots-end">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={totalPages === currentPage ? "active-page" : ""}
        >
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-arrow"
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="admin-dashboard">
      <AdminNavBar />
      <div className="content">
        <h2>All Recipes</h2>
        <button onClick={handleBulkDelete} className="delete-button">Delete Selected</button>

        <div className="paginationn">
            {renderPageNumbers()}
        </div>
        <table className="recipe-table">
          <thead>
            <tr>
              <th>
                <span onClick={() => {
                  if (selectedRecipes.size === recipes.length) {
                    setSelectedRecipes(new Set());
                  } else {
                    setSelectedRecipes(new Set(recipes.map(recipe => recipe.id)));
                  }
                }}>
                  <input type="checkbox" checked={selectedRecipes.size === recipes.length} />
                </span>
              </th>
              <th><FaImage /></th> {/* Placeholder for image */}
              
              <th onClick={() => handleSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('sku')}>
                SKU {sortConfig.key === 'sku' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('stock')}>
                Stock {sortConfig.key === 'stock' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('categories')}>
                Categories {sortConfig.key === 'categories' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('tags')}>
                Tags {sortConfig.key === 'tags' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('created_at')}>
                Date Created {sortConfig.key === 'created_at' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.map((recipe) => (
              <tr key={recipe.id} className="recipe-row">
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRecipes.has(recipe.id)}
                    onChange={() => handleCheckboxChange(recipe.id)}
                  />
                </td>
                <td>
                  {recipe.slika && <img src={`http://localhost:8000/storage/${recipe.slika}`} alt={recipe.name} className="recipe-image" />}
                </td>
                
                <td>
  <span>{recipe.name}</span>
  <div className="actions">
    <Link to={`/admin/edit-recipe/${recipe.id}`} className="edit-link-list">Edit</Link>
    <button className="delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
  </div>
</td>
                <td>{recipe.sku}</td>
                <td>{recipe.stock}</td>
                <td>{recipe.price}</td>
                <td>{recipe.categories?.join(', ')}</td>
                <td>{recipe.tags?.join(', ')}</td>
                <td>{recipe.created_at}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <div className="paginationn">
            {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  if (window.confirm('Are you sure you want to delete this recipe?')) {
    axios.delete(`/api/recipes/${id}`)
      .then(response => {
        alert('Recipe deleted');
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  }
};

export default RecipeList;