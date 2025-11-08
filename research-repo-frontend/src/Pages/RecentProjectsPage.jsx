// src/Pages/RecentProjectsPage.jsx
import React from "react";
import RecentProjectsTable from "../components/admin/RecentProjectsTable";
import { sampleProjects } from "../data/data";

const RecentProjectsPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Recent Projects</h1>
      <RecentProjectsTable projects={sampleProjects} />
    </div>
  );
};

export default RecentProjectsPage;
