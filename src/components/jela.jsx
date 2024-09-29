import React, { useState, useEffect } from 'react';
import JednoJelo from './jednoJelo';
import axios from 'axios';
import './css/recipes.css';
import { Range } from 'react-range'; // Import Range from react-range

const Jela = () => {
    const [recipes, setRecipes] = useState(null);
    const [filteredRecipes, setFilteredRecipes] = useState(null);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState(''); // For sorting
    const [filter, setFilter] = useState(''); // For filtering by ingredient
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [prepTimeRange, setPrepTimeRange] = useState([0, 120]); // Range slider for prep time

    const STEP = 5; // Step for the slider
    const MIN = 0; // Min prep time
    const MAX = 120; // Max prep time

    // Fetch recipes from API
    useEffect(() => {
        axios.get(`/api/recipes?page=${currentPage}`)
            .then((res) => {
                setRecipes(res.data.data);
                setFilteredRecipes(res.data.data);
                setTotalPages(res.data.meta.last_page); // Total number of pages
            })
            .catch((err) => {
                console.error("Error fetching recipes:", err);
                setError("There was an issue loading recipes.");
            });
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
    
        // Only add pagination if there's more than one page
        if (totalPages > 1) {
            // Always add the first page button
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={1 === currentPage ? "active-page" : ""}
                >
                    1
                </button>
            );
    
            // Add dots for previous pages if needed
            if (currentPage > 2) {
                pageNumbers.push(<span key="dots-start">...</span>);
            }
    
            // Add buttons for current and surrounding pages
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
    
            // Add dots for next pages if needed
            if (currentPage < totalPages - 1) {
                pageNumbers.push(<span key="dots-end">...</span>);
            }
    
            // Always add the last page button
            if (totalPages > 1) {
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
        }
    
        return pageNumbers;
    };
    
    

    // Handle sorting when sortOrder changes
    useEffect(() => {
        if (recipes && sortOrder) {
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
    }, [sortOrder, recipes, filteredRecipes]);

    // Handle filtering when filter or prep time range changes
    useEffect(() => {
        if (recipes) {
            let filtered = recipes.filter(recipe => 
                recipe.ingredients.some(ing => ing.name.includes(filter)) &&
                recipe.prep_time >= prepTimeRange[0] && recipe.prep_time <= prepTimeRange[1]
            );
            setFilteredRecipes(filtered);
        }
    }, [filter, prepTimeRange, recipes]);

    if (error) {
        return <h1>{error}</h1>;
    }

    if (!recipes) {
        return <h1>Loading recipes...</h1>;
    }

    return (
        <div className="container">
            <div className="left-column">
                {/* Filter and Sort Options */}
                <h2>Filter and Sort</h2>
                
                {/* Filter by Ingredient */}
                <div>
                    <label>Filter by Ingredient: </label>
                    <input 
                        type="text" 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        placeholder="Enter ingredient name" 
                    />
                </div>
                
                {/* Sort by */}
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
                
                {/* Single Slider with Two Values for Prep Time */}
                <div>
                    <label>Prep Time Range: {prepTimeRange[0]} - {prepTimeRange[1]} min</label>
                <Range
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    values={prepTimeRange}
                    onChange={(values) => setPrepTimeRange(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                height: '6px',
                                width: '100%',
                                background: '#ddd',
                                margin: '15px 0',
                                position: 'relative',
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props, index }) => (
                        <div
                            {...props}
                            style={{
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                backgroundColor: '#999',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0px 2px 6px #AAA',
                                position: 'relative',  
                                top: index === 0 ? '0px' : '-20px',  // Different top values for left (index 0) and right (index 1)
                            }}
                        />
                    )}
                />


                </div>
            </div>

            <div className="right-column">
    <div className="recipe-list">
        {filteredRecipes === null ? (
            <h1>Loading recipes...</h1>
        ) : (
            filteredRecipes.map((recipe) => (
                <JednoJelo key={recipe.id} recipe={recipe} />
            ))
        )}
        <div className="pagination">
            {renderPageNumbers()}
        </div>
    </div>
</div>



        </div>
    );
};

export default Jela;
