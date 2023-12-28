import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import "./navBar.css";

function NavBar() {
  const location = useLocation();
  return (
    <div className="navBar">
      <Link
        to="/"
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
      <Link
        to="/login"
        className={`Login ${location.pathname === "/login" ? "active" : ""}`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`Register ${
          location.pathname === "/register" ? "active" : ""
        }`}
      >
        Register
      </Link>{" "}
    </div>
  );
}

export default NavBar;
