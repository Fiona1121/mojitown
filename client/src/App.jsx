import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateCharacter from "./pages/CreateCharacter";
import Village from "./pages/Village";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/village" element={<Village />} />
      </Routes>
    </Router>
  );
}

export default App;
