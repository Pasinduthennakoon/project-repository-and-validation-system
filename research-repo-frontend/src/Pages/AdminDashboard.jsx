import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/admin/SummaryCards";
import ProjectsByDeptChart from "../components/admin/Charts/ProjectsByDeptChart";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import IdeaValidationTable from "../components/admin/IdeaValidationTable";
import AIAnalysisPanel from "../components/admin/AIAnalysisPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [deptData, setDeptData] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);
  const [analysisIdeas, setanalysisIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [summaryRes, deptRes, projectsRes, ideasRes] = await Promise.all([
          fetch("http://localhost:8080/api/admin/dashboard/summary"),
          fetch("http://localhost:8080/api/admin/dashboard/count-by-department"),
          fetch("http://localhost:8080/api/admin/dashboard/projects/recent"),
          fetch("http://localhost:8080/api/v1/idea/all"),
        ]);

        if (!summaryRes.ok || !deptRes.ok || !projectsRes.ok || !ideasRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const summaryData = await summaryRes.json();
        const deptRaw = await deptRes.json();
        const projectsData = await projectsRes.json();
        const ideasData = await ideasRes.json();

        // Transform department data into chart format
        const formattedDeptData = {
          labels: deptRaw.data.labels,
          datasets: [
            {
              label: "Projects",
              data: deptRaw.data.data,
              backgroundColor: "#3b82f6",
            },
          ],
        };

        setSummary(summaryData.data);
        setDeptData(formattedDeptData);
        setRecentProjects(projectsData.data);
        setanalysisIdeas(ideasData.data);
      } catch (err) {
        console.error(err);
        setError("Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  console.log("Summary:", summary);
  console.log("Department Data:", deptData);
  console.log("Recent Projects:", recentProjects);
  console.log("Analysis Ideas:", analysisIdeas);
  // Validation helper
  const isValidChartData = (data) =>
    data &&
    Array.isArray(data.labels) &&
    data.labels.length > 0 &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0 &&
    Array.isArray(data.datasets[0].data);

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold">{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Summary */}
      {summary && <SummaryCards summary={summary} />}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isValidChartData(deptData) && <ProjectsByDeptChart data={deptData} />}
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-xl font-bold mb-2">Recent Projects</h2>

        <RecentProjectsTable projects={recentProjects.slice(0, 5)} />

        <div className="text-right mt-2">
          <button
            onClick={() => navigate("/project/table")}
            className="text-blue-600 hover:underline"
          >
            View All Projects →
          </button>
        </div>
      </div>

      {/* Idea Validation */}
      <IdeaValidationTable ideas={analysisIdeas.slice(0, 3)} />

      {/* AI Panel */}
      <AIAnalysisPanel projects={analysisIdeas}/>
    </div>
  );
};

export default AdminDashboard;
