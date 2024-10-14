import "./App.css";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NavBar from "./components/navBar";
import Jela from "./components/jela";
import Filter from "./components/filter";
import Login from "./components/login";
import Register from "./components/register";
import RecipePage from "./components/recipepage";
import ForgotPassword from "./components/forgotPassword";
import Cart from "./components/cartItem";
import AdminDashboard from "./components/adminDashboard";
import AddRecipe from "./components/addRecipe";
import DeleteRecipe from "./components/deleteRecipe";
import EditRecipe from "./components/editRecipe";
import RecipeList from "./components/recipeList";
import { AuthProvider } from './authContext'; // Import AuthProvider
import MediaLibrary from "./components/mediaLibrary";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <BrowserRouter>
        <div className="cssjela">
          <NavBar /> {/* Move NavBar outside of Routes to ensure it's always visible */}
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/recipe-list" element={<RecipeList />} />
            <Route path="/admin/delete-recipe" element={<DeleteRecipe />} />
            <Route path="/admin/media-library" element={<MediaLibrary />} />
            <Route path="/admin/add-recipe" element={<AddRecipe />} />
            <Route path="/admin/edit-recipe/:recipeId" element={<EditRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipes" element={<Jela />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/recipes" />} /> {/* Redirect to recipes on root */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;