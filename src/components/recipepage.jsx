import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser'; // Import the parsing library
import './css/recipePage.css'; 

const RecipePage = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]); // State to store headings

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("/api/recipes/all");
        const recipeData = response.data.data.find(recipe => recipe.id === parseInt(id));
        setRecipe(recipeData);
      } catch (err) {
        setError('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      // Parse the recipe description and extract headings
      const parsedContent = parse(recipe.opis);
      const extractedHeadings = [];

      // Function to extract headings
      const extractHeadings = (node) => {
        // Check if the node is a valid React element
        if (React.isValidElement(node)) {
          if (node.type && node.type.startsWith('h')) { // Check if it's a heading
            const headingText = node.props.children; // Get children for heading text
            const headingLevel = parseInt(node.type.replace('h', '')); // Get the heading level (1 for h1, 2 for h2, etc.)
            const headingId = typeof headingText === 'string'
              ? headingText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
              : ''; // Create id based on heading text

            extractedHeadings.push({ text: headingText, id: headingId, level: headingLevel });
          }
          // Recursively extract headings from children
          if (node.props.children) {
            React.Children.forEach(node.props.children, extractHeadings);
          }
        } else if (Array.isArray(node)) { // If node is an array, iterate over it
          node.forEach(extractHeadings);
        }
      };

      React.Children.forEach(parsedContent, extractHeadings);
      setHeadings(extractedHeadings);
    }
  }, [recipe]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p className="not-found">Recipe not found</p>;

  return (
    <div className="recipe-page-layout">
      {/* Article Header */}
      <div className="recipe-header">
        <div className="recipe-image-container">
          <img className="recipe-image" src={`http://localhost:8000/storage/${recipe.slika}`} alt={recipe.name} />
        </div>
        <div className="recipe-info">
          <h1 className="recipe-title">{recipe.name}</h1>
          <div className="recipe-metadata">
            <hr />
            <div className="metadata-row">
              <span>Update: {recipe.updated_at}</span>
              <span>Author: {recipe.written_by}</span>
            </div>
            <div className="metadata-row">
              <span>Publish: {recipe.created_at}</span>
              <span>Reviewed by: {recipe.reviewed_by}</span>
            </div>
            <hr />
            <h2 id="ingredients">Ingredients:</h2>
            <ul>
              {recipe.ingredients.map(sastojak => <li key={sastojak.id}>{sastojak.name}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content and Sidebar */}
      <div className="recipe-container">
        <div className="table-of-contents">
          <h3>Table of Contents</h3>
          <ul>
            {headings.map((heading, index) => (
              <li key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-content">
          <div dangerouslySetInnerHTML={{ __html: recipe.opis }} />
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
