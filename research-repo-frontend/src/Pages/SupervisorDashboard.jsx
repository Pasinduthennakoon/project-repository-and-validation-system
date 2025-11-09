import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/admin/SummaryCards";
import TechPieChart from "../components/admin/Charts/TechPieChart";
import TrendLineChart from "../components/admin/Charts/TrendLineChart";
import GapAnalysisSection from "../components/admin/GapAnalysisSection";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import IdeaValidationTable from "../components/admin/IdeaValidationTable";
import AIAnalysisPanel from "../components/admin/AIAnalysisPanel";
import { sampleProjects } from "../data/data";
import { useAuth } from "../context/AuthContext"; // optional

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  // 🔹 Simulate logged-in supervisor
  const { user } = useAuth?.() || {
    user: { name: "Dr. Silva", department: "CS", role: "supervisor" },
  };

  // 🔹 All department data
  const deptDataMap = {
    CS: {
      summary: {
        totalProjects: 42,
        ideasAnalyzed: 25,
        avgRating: 4.4,
        activeStudents: 20,
      },
      techData: {
        labels: ["AI", "IoT", "Blockchain", "ML", "Web"],
        datasets: [
          {
            label: "Technologies",
            data: [15, 10, 5, 12, 8],
            backgroundColor: [
              "#6366f1",
              "#f97316",
              "#22c55e",
              "#06b6d4",
              "#ef4444",
            ],
          },
        ],
      },
      trendData: {
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
      },
    },
    IT: {
      summary: {
        totalProjects: 38,
        ideasAnalyzed: 20,
        avgRating: 4.3,
        activeStudents: 18,
      },
      techData: {
        labels: ["AI", "IoT", "Web", "ML"],
        datasets: [
          {
            data: [10, 12, 8, 10],
            backgroundColor: ["#3b82f6", "#facc15", "#ef4444", "#10b981"],
          },
        ],
      },
      trendData: {
        labels: ["2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "IT Projects",
            data: [4, 8, 10, 15, 18],
            borderColor: "#3b82f6",
            fill: false,
          },
        ],
      },
    },
    SE: {
      summary: {
        totalProjects: 27,
        ideasAnalyzed: 15,
        avgRating: 4.1,
        activeStudents: 12,
      },
      techData: {
        labels: ["AI", "Cloud", "Blockchain", "Testing"],
        datasets: [
          {
            data: [8, 10, 4, 5],
            backgroundColor: ["#14b8a6", "#f59e0b", "#6366f1", "#ef4444"],
          },
        ],
      },
      trendData: {
        labels: ["2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "SE Projects",
            data: [2, 5, 8, 10, 13],
            borderColor: "#f59e0b",
            fill: false,
          },
        ],
      },
    },
  };

  // ✅ Ensure safe fallback if department missing
  const department = user?.department || "CS";
  const data = deptDataMap[department] || deptDataMap["CS"];

  const [summary, setSummary] = useState(data.summary);
  const [techData, setTechData] = useState(data.techData);
  const [trendData, setTrendData] = useState(data.trendData);

  // 🔹 Filter projects only from this department
  const filteredProjects = sampleProjects.filter(
    (p) => p.department === department
  );

  const isValidChartData = (data) =>
    data?.labels?.length && data?.datasets?.length && data.datasets[0]?.data;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        {department} Department Dashboard
      </h1>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-2 gap-6">
        {isValidChartData(techData) && <TechPieChart data={techData} />}
        {isValidChartData(trendData) && <TrendLineChart data={trendData} />}
      </div>

      <GapAnalysisSection department={department} />

      <section>
        <h2 className="text-xl font-bold mb-2">
          Recent Projects ({department})
        </h2>
        <RecentProjectsTable projects={filteredProjects.slice(0, 5)} />
        <div className="text-right mt-2">
          <button
            onClick={() =>
              navigate("/project/table", { state: { department } })
            }
            className="text-blue-600 hover:underline"
          >
            View All Department Projects →
          </button>
        </div>
      </section>

      <IdeaValidationTable department={department} />
      <AIAnalysisPanel department={department} />
    </div>
  );
};

export default SupervisorDashboard;
