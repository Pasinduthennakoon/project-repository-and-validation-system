// src/components/Charts/CategoryPieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const CategoryPieChart = ({ projects }) => {
  // Count frequency of tags
  const tagCounts = {};
  projects.forEach((p) =>
    p.tags.forEach((tag) => (tagCounts[tag] = (tagCounts[tag] || 0) + 1))
  );

  const data = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        data: Object.values(tagCounts),
        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f97316",
          "#dc2626",
          "#9333ea",
          "#0ea5e9",
          "#f59e0b",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Projects by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
