import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to Coder's Life Ledger! 🚀</h1>
        <p>📅 {date.toLocaleDateString()} | ⏰ {date.toLocaleTimeString()}</p>

        <div className="card-container">
          <div className="card">
            <h2>⏰ Coding Hours</h2>
            <p>5 Hours</p>
          </div>

          <div className="card">
            <h2>🐞 Bugs Fixed</h2>
            <p>3</p>
          </div>

          <div className="card">
            <h2>🚀 Skills Upgraded</h2>
            <p>2</p>
          </div>
        </div>

        <div className="buttons">
          <button onClick={() => window.location.href = '/journal'}>📖 Open Journal</button>
          <button onClick={() => window.location.href = '/balance-sheet'}>📊 View Balance Sheet</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
