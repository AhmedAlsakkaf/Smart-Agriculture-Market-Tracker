import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Default route - HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Add more routes here as we build */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          {/* <Route path="/farmer" element={<FarmerDashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
