import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import "./navBar.css";
import axios from "axios";
import { Outlet } from "react-router-dom";

function NavBar({token}) {
  const location = useLocation();
  

  function handleLogout(e)
  {
    let data = new FormData();
data.append('email', 'andrija@gmail.com');
data.append('password', 'andrija123');
data.append('name', 'andrija');

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
      <Link
        to="/filter"
        className={`titl ${location.pathname === "/" ? "active" : ""}`}
      >
        <LuChefHat className="ikonica" /> Receptorijum
      </Link>
      <Link
        to="/svajela"
        className={`SvaJela ${
          location.pathname === "/svajela" ? "active" : ""
        }`}
      >
        Sva Jela
      </Link>
      <Link
        to="/Contact"
        className={`Kontakt ${
          location.pathname === "/Contact" ? "active" : ""
        }`}
      >
        Kontakt
      </Link>
      {
      token == null ?
      <Link
        to="/login"
              className={`Login ${
                  location.pathname === "/login" ? "active" : ""}`}
      >
        Login 
        </Link>
        :
        <Link
        to="/login"
        onClick={handleLogout}
              className={`Logout ${
                  location.pathname === "/logout" ? "active" : ""}`}
      >
        Logout
      
      </Link>
      }
      {/* <Link
        to="/register"
        className={`Register ${
          location.pathname === "/register" ? "active" : ""
        }`}
      >
        Register
      </Link>{" "} */}
      
    </div>
    <Outlet/>
    </div>
  );
}

export default NavBar;
