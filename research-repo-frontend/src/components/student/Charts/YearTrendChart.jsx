// src/components/Charts/YearTrendChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const YearTrendChart = ({ projects }) => {
  const yearCounts = {};
  projects.forEach(
    (p) => (yearCounts[p.batch] = (yearCounts[p.batch] || 0) + 1)
  );

  const sortedYears = Object.keys(yearCounts).sort();
  const data = {
    labels: sortedYears,
    datasets: [
      {
        label: "Projects by Year",
        data: sortedYears.map((year) => yearCounts[year]),
        borderColor: "#1d4ed8",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Projects by Year</h2>
      <Line data={data} />
    </div>
  );
};

export default YearTrendChart;
