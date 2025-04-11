// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import QRScan from './components/QRCodeScan';
import AllCards from './components/AllCards';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<QRScan />} />
            <Route path="/allCards" element={<AllCards />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
