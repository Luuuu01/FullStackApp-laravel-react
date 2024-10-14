import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import "./css/navBar.css";
import { IoCartOutline } from "react-icons/io5";
import { useAuth } from "../authContext"; // Import the useAuth hook

function NavBar() {
  const { token, logout } = useAuth(); // Get token and logout from context
  const location = useLocation();

  return (
    <div>
      <div className="navBar">
        <Link to="/filter" className={`titl ${location.pathname === "/" ? "active" : ""}`}>
          <LuChefHat className="ikonica" /> Receptorijum
        </Link>
        <Link to="/recipes" className={`SvaJela ${location.pathname === "/recipes" ? "active" : ""}`}>
          Recipes
        </Link>
        {
          !token ?
            <Link to="/login" className={`Login ${location.pathname === "/login" ? "active" : ""}`}>
              Login 
            </Link>
            :
            <Link to="/login" onClick={logout} className={`Logout ${location.pathname === "/logout" ? "active" : ""}`}> 
              Logout
            </Link>
        } 
        <Link to="/cart" className={`Cart ${location.pathname === "/cart" ? "active" : ""}`}>
          <IoCartOutline className="cart-icon"/> Cart
        </Link>
      </div>
    </div>
  );
}

export default NavBar;