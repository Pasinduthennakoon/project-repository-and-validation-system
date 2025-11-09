// src/Pages/StudentDashboard.jsx
import React from "react";
import { sampleProjects } from "../data/data";
import CategoryPieChart from "../components/student/Charts/CategoryPieChart";
import DepartmentBarChart from "../components/student/Charts/DepartmentBarChart";
import YearTrendChart from "../components/student/Charts/YearTrendChart";
import WordCloudChart from "../components/student/Charts/WordCloudChart";
import UnexploredAreas from "../components/student/Charts/UnexploredAreas";
import TrendLineChart from "../components/admin/Charts/TrendLineChart";
import GapAnalysisSection from "../components/admin/GapAnalysisSection";

const StudentDashboard = () => {
  const projects = sampleProjects;

  const trendData = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "AI Projects",
        data: [5, 12, 19, 28, 37],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "Cybersecurity Projects",
        data: [10, 23, 20, 12, 5],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "blockchain Projects",
        data: [2, 15, 20, 10, 3],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "Iot Projects",
        data: [0, 2, 10, 2, 15],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "ML Projects",
        data: [0, 15, 10, 30, 35],
        borderColor: "#10b981",
        fill: false,
      },
      {
        label: "Security Projects",
        data: [0, 6, 10, 12, 5],
        borderColor: "#10b981",
        fill: false,
      },
    ],
  };

  const isValidChartData = (data) =>
    data &&
    Array.isArray(data.labels) &&
    data.labels.length > 0 &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0 &&
    Array.isArray(data.datasets[0].data);

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Student Project Summary Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryPieChart projects={projects} />
        <WordCloudChart projects={projects} />
          {isValidChartData(trendData) && <TrendLineChart data={trendData} />}
      </div>

      <GapAnalysisSection />
      <UnexploredAreas projects={projects} />
    </div>
  );
};

export default StudentDashboard;
