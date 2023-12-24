import React from 'react'
import { Link,useLocation } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import './navBar.css';



function NavBar() {
    const location = useLocation();
    return (
        <div className="navBar">
            <Link to="/" className={`titl ${location.pathname === '/' ? 'active' : ''}`}><LuChefHat className='ikonica'/> Receptorijum</Link><Link to="/svajela" className={`SvaJela ${location.pathname === '/svajela' ? 'active' : ''}`}>Sva Jela</Link><Link to="/Contact" className={`Kontakt ${location.pathname === '/Contact' ? 'active' : ''}`}>Kontaktirajte Nas</Link>
        </div>
    )
}

export default NavBar