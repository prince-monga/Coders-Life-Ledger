import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Journal from './pages/Journal';
import BalanceSheet from './pages/BalanceSheet';

function App() {
  return (
    
    <Router>
            <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/balance-sheet" element={<BalanceSheet />} />
      </Routes>
    </Router>
  );
}

export default App;
