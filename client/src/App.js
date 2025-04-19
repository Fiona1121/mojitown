import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateCharacter from './pages/CreateCharacter';
import Village from './pages/Village';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/village" element={<Village />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;