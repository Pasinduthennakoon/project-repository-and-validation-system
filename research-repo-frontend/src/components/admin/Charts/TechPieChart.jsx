import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const TechPieChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow h-[500px]">
      <h2 className="text-lg font-semibold mb-2">Technologies Used</h2>

      {/* Make chart fill the parent and center it */}
      <div className="h-full flex items-center justify-center">
        <div className="w-full h-full">
          <Pie
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default TechPieChart;
