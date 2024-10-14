import axios from 'axios';
import React from 'react';
import "./css/addToCart.css";

const AddToCartButton = ({ recipeId }) => {
    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('auth_token'); // Preuzmi auth_token iz sessionStorage
            const response = await axios.post(
                '/api/cart-items',
                { recipe_id: recipeId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.message); // Ispis poruke o uspešnom dodavanju
        } catch (error) {
            console.error('Error adding to cart:', error.response ? error.response.data : error);
        }
    };

    return (
        <button className='addToCart' onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
