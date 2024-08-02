import "./App.css";
import { useState } from "react";
import Jela from "./components/jela";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Filter from "./components/filter";
import ContactPage from "./components/contactPage";
import Login from "./components/login";
import Register from "./components/register";

function App() {

  const [token,setToken]=useState();

  function addToken(token){
    setToken(token);
  }

  return (
    <BrowserRouter>
      

      <div className="cssjela">
        <Routes>
          <Route path="/login" element={<Login addToken={addToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/" element={<NavBar token={token} />}>
          <Route path="svajela" element={<Jela/>} />
          <Route
            path="filter"
            element={<Filter/>}
          />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
