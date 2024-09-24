import "./App.css";
import { useState } from "react";
import Jela from "./components/jela";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import Filter from "./components/filter";
import Login from "./components/login";
import Register from "./components/register";
import RecipePage from "./components/recipepage";
import ForgotPassword from "./components/forgotPassword";
import Cart from "./components/cartItem";
import AdminDashboard from "./components/adminDashboard";
import AddRecipe from "./components/addRecipe";
import DeleteRecipe from "./components/deleteRecipe";

function App() {

  const [token,setToken]=useState();
  const [isAdmin, setIsAdmin] = useState(false);

  function addToken(token){
    setToken(token);
  }

  return (

    <BrowserRouter>
      <div className="cssjela">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard isAdmin={isAdmin}/>} />
          <Route path="/" element={<NavBar token={token} />} >
          <Route path="/login" element={<Login addToken={addToken} setIsAdmin={setIsAdmin}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/add-recipe" element={<AddRecipe />} />
          <Route path="/admin/delete-recipe" element={<DeleteRecipe />} />
          <Route path="recipes" element={<Jela/>} />
          <Route path="filter" element={<Filter/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;