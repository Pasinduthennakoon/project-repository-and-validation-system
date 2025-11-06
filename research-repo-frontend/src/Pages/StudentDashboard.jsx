// src/Pages/StudentDashboard.jsx
import React from "react";
import { sampleProjects } from "../data/data";
import CategoryPieChart from "../components/student/Charts/CategoryPieChart";
import DepartmentBarChart from "../components/student/Charts/DepartmentBarChart";
import YearTrendChart from "../components/student/Charts/YearTrendChart";
import WordCloudChart from "../components/student/Charts/WordCloudChart";
import UnexploredAreas from "../components/student/Charts/UnexploredAreas";

const StudentDashboard = () => {
  const projects = sampleProjects;

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Student Project Summary Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryPieChart projects={projects} />
        <DepartmentBarChart projects={projects} />
        <YearTrendChart projects={projects} />
        <WordCloudChart projects={projects} />
      </div>

      <UnexploredAreas projects={projects} />
    </div>
  );
};

export default StudentDashboard;
