import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/cartitem.css';

function Cart() {
  const [items, setItems] = useState([]);
  

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = sessionStorage.getItem('auth_token'); // Preuzmi auth_token
                const response = await axios.get('http://localhost:8000/api/cart-items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setItems(response.data.cart_items); // Postavi preuzete stavke u state
            } catch (error) {
                console.error('Error fetching cart items:', error.response ? error.response.data : error);
            }
        };

        fetchCartItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = sessionStorage.getItem('auth_token');
            await axios.delete(`http://localhost:8000/api/cart-items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Nakon brisanja, filtriraj listu da ukloniš obrisanu stavku
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting cart item:', error.response ? error.response.data : error);
        }
    };

  if (!items.length) {
    return <p className="empty-cart">Vaša korpa je prazna.</p>;
  }

  return (
    <div className="cart-container">
            <h2>Your Cart</h2>
            <ul className="cart-items">
                {items.map(item => (
                    <li key={item.id} className="cart-item">
                        
                        <img src={item.recipe.slika} alt={item.recipe.name} style={{ width: '200px', height: '150px' }} />
                        <div className="cart-item-info">
                        <h3>{item.recipe.name}</h3>
                        <p>Prep Time: {item.recipe.prep_time} minutes</p>
                        </div>
                        <button onClick={() => handleDelete(item.id)}>Remove from Cart</button>
                    </li>
                ))}
            </ul>
        </div>
  );
}

export default Cart;
