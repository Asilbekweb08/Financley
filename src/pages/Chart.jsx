import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ transactions }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const calculateExpenseData = () => {
      const expenseCategories = {};
      
      transactions?.forEach((transaction) => {
        if (transaction.type === "expense") {
          const { name, amount } = transaction;
          expenseCategories[name] = (expenseCategories[name] || 0) + amount;
        }
      });

      const labels = Object.keys(expenseCategories);
      const data = Object.values(expenseCategories);

      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      });
    };

    calculateExpenseData();
  }, [transactions]);

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <h2>Expense Distribution</h2>
      {chartData.labels ? (
        <Doughnut data={chartData} />
      ) : (
        <p>No expenses to display</p>
      )}
    </div>
  );
};

export default Chart;
