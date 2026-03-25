import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SummaryCards from "../components/admin/SummaryCards";
import TechPieChart from "../components/admin/Charts/TechPieChart";
import TrendLineChart from "../components/admin/Charts/TrendLineChart";
import GapAnalysisSection from "../components/admin/GapAnalysisSection";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import IdeaValidationTable from "../components/admin/IdeaValidationTable";
import AIAnalysisPanel from "../components/admin/AIAnalysisPanel";
import { useAuth } from "../context/AuthContext";

const colors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const department = user?.department; // safe access

  const [recentProjects, setRecentProjects] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [summary, setSummary] = useState({});
  const [gapInsights, setGapInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Helper to normalize tags
  const normalizeTags = (tags) => {
    if (!tags) return [];
    return Array.isArray(tags) ? tags : [tags];
  };

  // ✅ FETCH DATA
  useEffect(() => {
    if (!department) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [summaryRes, recentRes, ideaRes, gapRes] = await Promise.all([
          fetch(
            `http://localhost:8080/api/supervisor/dashboard/summary?department=${encodeURIComponent(
              department
            )}`
          ),
          fetch("http://localhost:8080/api/admin/dashboard/projects/recent"),
          fetch("http://localhost:8080/api/v1/idea/all"),
          fetch("http://localhost:8080/api/v1/project/gap-insights"),
        ]);

        if (
          !summaryRes.ok ||
          !recentRes.ok ||
          !ideaRes.ok ||
          !gapRes.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }

        const summaryData = await summaryRes.json();
        const recentData = await recentRes.json();
        const ideaData = await ideaRes.json();
        const gapData = await gapRes.json();

        setSummary(summaryData?.data || {});
        setRecentProjects(recentData?.data || []);
        setIdeas(ideaData?.data || []);
        setGapInsights(gapData?.data || null);
      } catch (err) {
        console.error(err);
        setError("Error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [department]);

  // ✅ Filter projects and ideas by department
  const deptRecentProjects = useMemo(() => {
    return recentProjects.filter(
      (p) =>
        p.department?.toLowerCase().trim() ===
        department?.toLowerCase().trim()
    );
  }, [recentProjects, department]);

  const deptIdeas = useMemo(() => {
    return ideas.filter(
      (i) =>
        i.department?.toLowerCase().trim() ===
        department?.toLowerCase().trim()
    );
  }, [ideas, department]);

  // ✅ Tech Pie Chart
  const techData = useMemo(() => {
    const techCount = {};

    deptRecentProjects.forEach((p) => {
      normalizeTags(p.tags).forEach((tag) => {
        techCount[tag] = (techCount[tag] || 0) + 1;
      });
    });

    const labels = Object.keys(techCount);
    const data = Object.values(techCount);

    if (!labels.length || !data.length) return null;

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map(
            (_, i) => colors[i % colors.length]
          ),
        },
      ],
    };
  }, [deptRecentProjects]);

  // ✅ Trend Line Chart
  const trendData = useMemo(() => {
    if (!deptRecentProjects.length) return null;

    const batches = [...new Set(deptRecentProjects.map((p) => p.batch))].sort();
    const categories = [
      ...new Set(
        deptRecentProjects.flatMap((p) => normalizeTags(p.tags))
      ),
    ];

    if (!categories.length) return null;

    const datasets = categories.map((category, index) => ({
      label: category,
      data: batches.map(
        (batch) =>
          deptRecentProjects.filter(
            (p) =>
              p.batch === batch &&
              normalizeTags(p.tags).includes(category)
          ).length
      ),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.3,
      fill: false,
    }));

    return { labels: batches, datasets };
  }, [deptRecentProjects]);

  const isValidChartData = (data) =>
    data &&
    Array.isArray(data.labels) &&
    data.labels.length > 0 &&
    Array.isArray(data.datasets) &&
    data.datasets.length > 0;

  // ✅ LOADING & ERROR STATES
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold">{error}</h1>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No department assigned</h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">
        {department} Supervisor Dashboard
      </h1>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-2 gap-6">
        {techData && isValidChartData(techData) && (
          <TechPieChart data={techData} />
        )}
        {trendData && isValidChartData(trendData) && (
          <TrendLineChart data={trendData} />
        )}
      </div>

      <GapAnalysisSection data={gapInsights} />

      {/* Recent Projects */}
      <section>
        <h2 className="text-xl font-bold mb-2">
          Recent Projects ({department})
        </h2>

        {deptRecentProjects.length === 0 ? (
          <p className="text-gray-500">No projects found</p>
        ) : (
          <RecentProjectsTable
            projects={deptRecentProjects.slice(0, 5)}
          />
        )}

        <div className="text-right mt-2">
          <button
            onClick={() =>
              navigate("/project/table", {
                state: { department },
              })
            }
            className="text-blue-600 hover:underline"
          >
            View All Department Projects →
          </button>
        </div>
      </section>

      {/* Ideas */}
      <IdeaValidationTable ideas={deptIdeas.slice(0, 3)} />

      {/* AI Panel */}
      <AIAnalysisPanel projects={deptIdeas} />
    </div>
  );
};

export default SupervisorDashboard;