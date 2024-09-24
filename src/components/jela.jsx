import React, { useState, useEffect } from 'react';
import JednoJelo from './jednoJelo';
import axios from 'axios';
import './css/recipes.css';

const Jela = () => {
    const [recipes, setRecipes] = useState(null);
    const [filteredRecipes, setFilteredRecipes] = useState(null);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState(''); // For sorting
    const [filter, setFilter] = useState(''); // For filtering

    useEffect(() => {
        if (recipes === null) {
            axios.get("/api/recipes")
                .then((res) => {
                    setRecipes(res.data.data);
                    setFilteredRecipes(res.data.data);
                })
                .catch((err) => {
                    console.error("Error fetching recipes:", err);
                    setError("There was an issue loading recipes.");
                });
        }
    }, [recipes]);

    // Handle sorting when sortOrder changes
    useEffect(() => {
        if (sortOrder) {
            let sortedRecipes = [...filteredRecipes];
            if (sortOrder === 'name-asc') {
                sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOrder === 'name-desc') {
                sortedRecipes.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sortOrder === 'prep-time-asc') {
                sortedRecipes.sort((a, b) => a.prep_time - b.prep_time);
            } else if (sortOrder === 'prep-time-desc') {
                sortedRecipes.sort((a, b) => b.prep_time - a.prep_time);
            }
            setFilteredRecipes(sortedRecipes);
        }
    }, [sortOrder, filteredRecipes]);

    // Handle filtering when filter changes
    useEffect(() => {
        if (filter) {
            let filtered = recipes.filter(recipe => recipe.ingredients.some(ing => ing.name.includes(filter)));
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes); // Reset to all recipes if no filter
        }
    }, [filter, recipes]);

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div className="container">
            <div className="left-column">
                {/* Filter and Sort Options */}
                <h2>Filter and Sort</h2>
                <div>
                    <label>Filter by Ingredient: </label>
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        placeholder="Enter ingredient name" 
                    />
                </div>
                <div>
                    <label>Sort by: </label>
                    <select onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="">Select</option>
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="prep-time-asc">Prep Time (Low to High)</option>
                        <option value="prep-time-desc">Prep Time (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className="right-column">
                {filteredRecipes === null ? (
                    <h1>Loading recipes...</h1>
                ) : (
                    filteredRecipes.map((recipe) => (
                        <JednoJelo key={recipe.id} recipe={recipe} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Jela;
