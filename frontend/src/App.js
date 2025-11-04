import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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

          {/* Add more routes here as we build */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/farmer" element={<FarmerDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
