import React from "react";
import SummaryCards from "../components/admin/SummaryCards";
import ProjectsByDeptChart from "../components/admin/Charts/ProjectsByDeptChart";
import TechPieChart from "../components/admin/Charts/TechPieChart";
import TrendLineChart from "../components/admin/Charts/TrendLineChart";
import WordCloudChart from "../components/admin/WordCloudChart";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import IdeaValidationTable from "../components/admin/IdeaValidationTable";
import GapAnalysisSection from "../components/admin/GapAnalysisSection";

const AdminDashboard = () => {
  // Mock data
  const summary = {
    totalProjects: 245,
    ideasAnalyzed: 130,
    avgRating: 4.3,
    activeStudents: 72,
  };

  const keywords = [
    { text: "AI", value: 50 },
    { text: "IoT", value: 30 },
    { text: "Blockchain", value: 10 },
    { text: "Deep Learning", value: 25 },
  ];

  const deptData = {
    labels: ["CS", "IT", "SE", "DS"],
    datasets: [
      {
        label: "Projects",
        data: [42, 38, 27, 18],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const techData = {
    labels: ["AI", "IoT", "Blockchain", "ML"],
    datasets: [
      {
        label: "Technologies",
        data: [35, 25, 10, 30],
        backgroundColor: ["#6366f1", "#f97316", "#22c55e", "#06b6d4"],
      },
    ],
  };

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

  // Helper to check if chart data is valid
  const isValidChartData = (data) =>
    data &&
    Array.isArray(data.labels) &&
    data.labels.length > 0 &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0 &&
    Array.isArray(data.datasets[0].data);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-2 gap-6">
          {isValidChartData(deptData) && (
            <ProjectsByDeptChart data={deptData} />
          )}
          {isValidChartData(techData) && <TechPieChart data={techData} />}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {isValidChartData(trendData) && <TrendLineChart data={trendData} />}
        {Array.isArray(keywords) && keywords.length > 0 && (
          <WordCloudChart words={keywords} />
        )}
      </div>

      <GapAnalysisSection />

      <RecentProjectsTable />
      <IdeaValidationTable />
    </div>
  );
};

export default AdminDashboard;
