import React from "react";
import SummaryCards from "../components/admin/SummaryCards";
import ProjectsByDeptChart from "../components/admin/Charts/ProjectsByDeptChart";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import IdeaValidationTable from "../components/admin/IdeaValidationTable";
import { sampleProjects } from "../data/data";
import { useNavigate } from "react-router-dom";
import AIAnalysisPanel from "../components/admin/AIAnalysisPanel";
import usersData from "../data/users.json";

const AdminDashboard = () => {
  const navigate = useNavigate();
  // Mock data
  const totalStudents = usersData.filter(u => u.role === "STUDENT").length;

  const summary = {
    totalProjects: 245,
    ideasAnalyzed: 130,
    activeStudents: 72,
    registeredStudents: totalStudents, // 🔹 New field
  };

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
        {isValidChartData(deptData) && <ProjectsByDeptChart data={deptData} />}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Recent Projects</h2>

        {/* Show only first 5 rows as preview */}
        <RecentProjectsTable projects={sampleProjects.slice(0, 5)} />

        <div className="text-right mt-2">
          <button
            onClick={() =>
              navigate("/project/table")
            }
            className="text-blue-600 hover:underline"
          >
            View All Projects →
          </button>
        </div>
      </div>
      <IdeaValidationTable />
      <div className=" ">
        <AIAnalysisPanel />
        {/* You can add other summary cards or charts here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
