// src/Pages/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import CategoryPieChart from "../components/student/Charts/CategoryPieChart";
import DepartmentBarChart from "../components/student/Charts/DepartmentBarChart";
import YearTrendChart from "../components/student/Charts/YearTrendChart";
import WordCloudChart from "../components/student/Charts/WordCloudChart";
import UnexploredAreas from "../components/student/Charts/UnexploredAreas";
import TrendLineChart from "../components/admin/Charts/TrendLineChart";
import GapAnalysisSection from "../components/admin/GapAnalysisSection";

const colors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [trendData, setTrendData] = useState({ labels: [], datasets: [] });
  const [gapInsights, setGapInsights] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/project/student_dashboard")
      .then((res) => res.json())
      .then(async (res) => {
        if (res.code === 200 && Array.isArray(res.data)) {
          const mapped = res.data.map((p) => ({
            ...p,
            batch: p.batch, // use batch instead of createdAt/year
            categories: Array.isArray(p.tags) ? p.tags : [],
          }));
          setProjects(mapped);
          setTrendData(generateTrendData(mapped));
        }
      })
      .catch((err) => console.error("Failed to fetch projects:", err));

    fetch("http://localhost:8080/api/v1/project/gap-insights")
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setGapInsights(res.data); // Set data directly
        }
      })
      .catch((err) => console.error("Failed to fetch gap insights:", err));
  }, []);

  // Generate trend data dynamically
  const generateTrendData = (projects) => {
    if (!projects || projects.length === 0) return { labels: [], datasets: [] };

    const batches = [...new Set(projects.map((p) => p.batch))].sort();

    // Flatten all categories and get unique list
    const categories = [...new Set(projects.flatMap((p) => p.categories))];

    const datasets = categories.map((category, index) => ({
      label: category,
      data: batches.map(
        (batch) =>
          projects.filter(
            (p) => p.batch === batch && p.categories.includes(category),
          ).length,
      ),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.3,
      fill: false,
    }));

    return { labels: batches, datasets };
  };
  console.log(projects);

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

      <GapAnalysisSection data={gapInsights} />
      <UnexploredAreas
          projects={projects.map((p) => ({ ...p, tags: p.categories }))}
        />
    </div>
  );
};

export default StudentDashboard;
