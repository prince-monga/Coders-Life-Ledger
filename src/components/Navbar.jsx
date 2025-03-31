import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>👨‍💻 Coder's Life Ledger</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/journal">Journal</a>
        <a href="/balance-sheet">Balance Sheet</a>
      </div>
    </nav>
  );
};

export default Navbar;
