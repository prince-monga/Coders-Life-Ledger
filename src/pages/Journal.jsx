// src/pages/Journal.jsx
import React, { useState, useEffect } from 'react';
import DailySummary from '../components/DailySummary';
import Navbar from '../components/Navbar';
const Journal = () => {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : {};
  });

  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [type, setType] = useState('credit');

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Add Entry with Date and Time
  const addEntry = () => {
    if (description.trim() && hours >= 0 && minutes >= 0) {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const newEntry = {
        time,
        description,
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        type,
      };

      const updatedEntries = { ...entries };
      if (!updatedEntries[date]) {
        updatedEntries[date] = [];
      }
      updatedEntries[date].push(newEntry);
      setEntries(updatedEntries);
      setDescription('');
      setHours('');
      setMinutes('');
    }
  };

  // Clear All Entries
  const clearEntries = () => {
    setEntries({});
    localStorage.removeItem('journalEntries');
  };

  return (
    <div><Navbar />
    <div className="container">
    
    <h2>📚 Coder's Life Journal (Ledger)</h2>

      {/* Input Form */}
      <input
        type="text"
        placeholder="Add Description (e.g., Coding, Debugging, YouTube)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="credit">✅ Productive (Credit)</option>
        <option value="debit">❌ Wasted (Debit)</option>
      </select>
      <button onClick={addEntry}>Add Entry</button>
      <button onClick={clearEntries} style={{ backgroundColor: '#ef4444' }}>
        Clear All Entries
      </button>

      {/* Journal Entries */}
      <h3>📝 Your Journal Entries</h3>
      {Object.keys(entries).length > 0 ? (
        Object.keys(entries).map((date, index) => (
          <DailySummary key={index} date={date} entries={entries[date]} />
        ))
      ) : (
        <p>No entries yet. Start adding your daily log! 🚀</p>
      )}
    </div>
    </div>
  );
};

export default Journal;
