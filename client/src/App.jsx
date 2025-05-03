import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateCharacter from "./pages/CreateCharacter";
import Village from "./pages/Village";
import CreateCharacterMBTI from './pages/CreateCharacterMBTI';
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/village" element={<Village />} />
        <Route path="/create-character/mbti" element={<CreateCharacterMBTI />} />
      </Routes>
    </Router>
  );
}

export default App;
