import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ income, expense, currentBalance, selectedCurrency }) => {
  // Data for the chart (Income, Expense, and Balance)
  const data = {
    labels: ['Income', 'Expense', 'Balance'],
    datasets: [
      {
        data: [income, expense, currentBalance],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(153, 102, 255, 1)'],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // Show the name and amount for each section
            return `${context.label}: ${context.raw.toFixed(2)} ${selectedCurrency}`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="chart-container flex justify-center items-center w-[60%] ml-[50px] h-[70vh] " data-aos="fade-right">
      {data.datasets.length>0?<Doughnut data={data} options={options} />:<h1>No data</h1>}
    </div>
  );
};

export default ChartComponent;
