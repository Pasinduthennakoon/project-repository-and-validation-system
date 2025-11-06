import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ProjectsByDeptChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow h-[500px]">
      <h2 className="text-lg font-semibold mb-2">Projects by Department</h2>
      <Bar data={data} />
    </div>
  );
};

export default ProjectsByDeptChart;
