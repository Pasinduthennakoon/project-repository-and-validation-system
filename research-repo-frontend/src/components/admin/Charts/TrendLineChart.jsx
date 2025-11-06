import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const TrendLineChart = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState("All");

  // 🎨 Assign smaller, consistent line colors
  const colorPalette = ["#3b82f6", "#f97316", "#22c55e", "#e11d48", "#9333ea"];
  const datasetsWithColors = data.datasets.map((dataset, index) => ({
    ...dataset,
    borderColor: colorPalette[index % colorPalette.length],
    backgroundColor: colorPalette[index % colorPalette.length],
    tension: 0.35,
    pointRadius: 4,
    pointHoverRadius: 6,
  }));

  // 🔍 Filter datasets based on selected project
  const filteredData =
    selectedProject === "All"
      ? { ...data, datasets: datasetsWithColors }
      : {
          ...data,
          datasets: datasetsWithColors.filter(
            (dataset) => dataset.label === selectedProject
          ),
        };

  // 🪄 Dynamic canvas title (inside chart)
  const dynamicCanvasTitle =
    selectedProject === "All"
      ? "All Project Categories Trends Over Years"
      : `${selectedProject} Trends Over Years`;

  // ⚙️ Chart.js options
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true, // ✅ makes legend markers circular
            pointStyle: "circle",
            boxWidth: 8, // ✅ controls circle size (smaller = tiny dot)
            boxHeight: 8,
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        title: {
          display: true,
          text: dynamicCanvasTitle,
          font: {
            size: 16,
            weight: "bold",
          },
          color: "#374151",
          padding: { top: 10, bottom: 10 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
          },
        },
      },
    }),
    [dynamicCanvasTitle]
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow h-96">
      {/* 🏷️ Static heading (outside chart) */}
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Final Year Project Trends Over Years
      </h2>

      {/* 🔽 Dropdown filter */}
      <div className="flex justify-end mb-2">
        <select
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="All">All Projects</option>
          {data.datasets.map((dataset) => (
            <option key={dataset.label} value={dataset.label}>
              {dataset.label}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 Chart */}
      <div className="h-72">
        <Line data={filteredData} options={options} />
      </div>
    </div>
  );
};

export default TrendLineChart;
