import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { day: "Monday", codeHours: 5, errors: 2 },
  { day: "Tuesday", codeHours: 8, errors: 1 },
  { day: "Wednesday", codeHours: 6, errors: 3 },
  { day: "Thursday", codeHours: 7, errors: 1 },
  { day: "Friday", codeHours: 5, errors: 0 },
];

const BalanceSheet = ({ taskPoints }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    type: "credit",
    points: "",
    description: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  // Auto-update from previous tasks
  useEffect(() => {
    if (taskPoints && taskPoints.length > 0) {
      setTransactions(taskPoints);
    }
  }, [taskPoints]);

  const addTransaction = () => {
    if (newTransaction.points && newTransaction.description) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        type: "credit",
        points: "",
        description: "",
        dateTime: new Date().toISOString().slice(0, 16),
      });
    }
  };

  const calculateBalance = () => {
    let balance = 0;
    transactions.forEach((txn) => {
      balance += txn.type === "credit" ? parseFloat(txn.points) : -parseFloat(txn.points);
    });
    return balance;
  };

  const downloadCSV = () => {
    const csvContent = [
      ["Type", "Points", "Description", "Date & Time"],
      ...transactions.map((txn) => [txn.type, txn.points, txn.description, txn.dateTime]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "balance_sheet.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const creditTotal = transactions.reduce(
    (acc, txn) => (txn.type === "credit" ? acc + parseFloat(txn.points) : acc),
    0
  );
  const debitTotal = transactions.reduce(
    (acc, txn) => (txn.type === "debit" ? acc + parseFloat(txn.points) : acc),
    0
  );

  const pieData = [
    { name: "Credit", value: creditTotal },
    { name: "Debit", value: debitTotal },
  ];

  const COLORS = ["#34D399", "#F87171"];

  const calculateGrowth = () => {
    const balance = calculateBalance();
    return balance > 0 ? `🚀 Growth: +${balance} Points` : `⚠️ Loss: ${balance} Points`;
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>📊 Life Balance Sheet (Points Edition)</h1>

        <div className="transaction-form">
       
        <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>

          <input
            type="number"
            placeholder="Points"
            value={newTransaction.points}
            onChange={(e) => setNewTransaction({ ...newTransaction, points: e.target.value })}
          />
          
          <input
            type="datetime-local"
            value={newTransaction.dateTime}
            onChange={(e) => setNewTransaction({ ...newTransaction, dateTime: e.target.value })}
          />
          <button onClick={addTransaction}>Add Transaction</button>
          <button onClick={downloadCSV}>Download CSV</button>
        </div>

        <h2>💰 Current Balance: {calculateBalance()} Points</h2>
        <h3>{calculateGrowth()}</h3>

        <div className="transactions-container">
          <div className="credit-side">
            <h3>✅ Credit Side</h3>
            {transactions
              .filter((txn) => txn.type === "credit")
              .map((txn, index) => (
                <div key={index} className="txn credit">
                  <p>{txn.description}</p>
                  <p>+{txn.points} Points</p>
                  <p>📅 {new Date(txn.dateTime).toLocaleString()}</p>
                </div>
              ))}
          </div>
          <div className="debit-side">
            <h3>❌ Debit Side</h3>
            {transactions
              .filter((txn) => txn.type === "debit")
              .map((txn, index) => (
                <div key={index} className="txn debit">
                  <p>{txn.description}</p>
                  <p>-{txn.points} Points</p>
                  <p>📅 {new Date(txn.dateTime).toLocaleString()}</p>
                </div>
              ))}
          </div>
        </div>

        <h2>📊 Credit vs Debit Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <h2>📚 Summary</h2>
        <div className="summary">
          <p>✅ Total Credit: {creditTotal} Points</p>
          <p>❌ Total Debit: {debitTotal} Points</p>
          <p>⚖️ Net Balance: {calculateBalance()} Points</p>
        </div>
        <h2>📊 Coding Week Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="codeHours" fill="#4F46E5" name="Code Hours" />
            <Bar dataKey="errors" fill="#f87171" name="Errors" />
          </BarChart>
        </ResponsiveContainer>

       
      </div>
    </div>
  );
};

export default BalanceSheet;
