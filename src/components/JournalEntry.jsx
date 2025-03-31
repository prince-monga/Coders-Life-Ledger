// src/components/JournalEntry.jsx
import React from 'react';

const JournalEntry = ({ entry }) => {
  const { time, description, hours, minutes, type } = entry;

  return (
    <div className={`entry ${type === 'debit' ? 'debit' : 'credit'}`}>
      <strong>{time} - {description}</strong>
      <p>
        ⏱️ {hours} hrs {minutes} mins ({type === 'credit' ? '✅ Productive' : '❌ Wasted'})
      </p>
    </div>
  );
};

export default JournalEntry;
