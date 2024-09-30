import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import "./css/navBar.css";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useEffect } from "react";

function NavBar({token}) {
  const location = useLocation();
  useEffect(() => {
    console.log("Token changed:", token);
  }, [token]);
  

  function handleLogout(e)
  {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/api/logout',
        headers: { 
          'Authorization': 'Bearer '+ window.sessionStorage.getItem("auth_token"),
        },
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  window.sessionStorage.setItem("auth_token",null);
})
.catch((error) => {
  console.log(error);
});
   
  }
  return (
    <div>
    <div className="navBar">
      <Link to="/filter" className={`titl ${location.pathname === "/" ? "active" : ""}`}>
        <LuChefHat className="ikonica" /> Receptorijum
      </Link>
      <Link to="/recipes" className={`SvaJela ${location.pathname === "/svajela" ? "active" : ""}`}>
        Sva Jela
      </Link>   
      {
      !token ?
      <Link to="/login" className={`Login ${location.pathname === "/login" ? "active" : ""}`}>
        Login 
        </Link>
        :
        <Link to="/login" onClick={handleLogout} className={`Logout ${location.pathname === "/logout" ? "active" : ""}`}> 
        Logout
      </Link>
       } 
      <Link to="/cart" className={`Cart ${location.pathname === "/cart" ? "active" : ""}`}>
        <IoCartOutline className="cart-icon"/> Cart
        </Link>
    </div>
    <Outlet/>
    </div>
  );
}

export default NavBar;
