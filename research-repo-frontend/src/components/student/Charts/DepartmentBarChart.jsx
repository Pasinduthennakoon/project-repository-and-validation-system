// src/components/Charts/DepartmentBarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DepartmentBarChart = ({ projects }) => {
  const deptCounts = {};
  projects.forEach(
    (p) => (deptCounts[p.department] = (deptCounts[p.department] || 0) + 1)
  );

  const data = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        label: "Projects per Department",
        data: Object.values(deptCounts),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Projects by Department</h2>
      <Bar data={data} />
    </div>
  );
};

export default DepartmentBarChart;
