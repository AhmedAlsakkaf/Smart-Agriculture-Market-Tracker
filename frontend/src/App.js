import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddProductPage from "./pages/AddProductPage";
import ProductsPage from "./pages/ProductsPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import MarketRatesPage from "./pages/MarketRatesPage";
import PriceTrendsPage from "./pages/PriceTrendsPage";
import WeatherPage from "./pages/WeatherPage";
import SmartAdvicePage from "./pages/SmartAdvicePage";
import ForumPage from "./pages/ForumPage";
import CreatePostPage from "./pages/CreatePostPage";
import ViewPostPage from "./pages/ViewPostPage";
import MyPostsPage from "./pages/MyPostsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Default route - HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />

          {/* Farmer Routes */}
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/market-rates" element={<MarketRatesPage />} />
          <Route path="/farmer/price-trends" element={<PriceTrendsPage />} />
          <Route path="/farmer/weather" element={<WeatherPage />} />
          <Route path="/farmer/smart-advice" element={<SmartAdvicePage />} />
          <Route path="/farmer/forum" element={<ForumPage />} />
          <Route path="/farmer/forum/create" element={<CreatePostPage />} />
          <Route path="/farmer/forum/:id" element={<ViewPostPage />} />
          <Route path="/farmer/my-posts" element={<MyPostsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
