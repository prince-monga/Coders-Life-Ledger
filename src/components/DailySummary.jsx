// src/components/DailySummary.jsx
import React from 'react';
import JournalEntry from './JournalEntry';

const DailySummary = ({ date, entries }) => {
  return (
    <div>
      <div className="date-header">📅 {date}</div>
      {entries.map((entry, index) => (
        <JournalEntry key={index} entry={entry} />
      ))}
    </div>
  );
};

export default DailySummary;
