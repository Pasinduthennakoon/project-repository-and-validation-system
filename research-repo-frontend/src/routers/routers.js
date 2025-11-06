import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Upload from "../Pages/Upload";
import ProjectDetails from "../Pages/ProjectDetails";
import IdeaComparisonPage from "../Pages/IdeaComparisonPage";
import DocumentationPage from "../Pages/DocumentationPage";
import AdminDashboard from "../Pages/AdminDashboard";
import StudentDashboard from '../Pages/StudentDashboard'
import LecturerDashboard from "../Pages/LecturerDashboard";
import SupervisorApprovals from "../Pages/SupervisorApprovals";
import PrivateRoute from "./PrivateRoute"; // ✅ import

const Routers = () => {
    return (
        <div>
            <Routes>
                {/* Public route */}
                <Route path="/" element={<Home />} />

                {/* Protected routes */}
                <Route
                    path="/projects"
                    element={
                        <PrivateRoute>
                            <Projects />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/upload"
                    element={
                        <PrivateRoute allowedRoles={["STUDENT"]}>
                            <Upload />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/projects/:id"
                    element={
                        <PrivateRoute>
                            <ProjectDetails />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ideavalidation"
                    element={
                        <PrivateRoute>
                            <IdeaComparisonPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projectdocumentation"
                    element={
                        <PrivateRoute>
                            <DocumentationPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/student/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["STUDENT"]}>
                            <StudentDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/lecturer/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["SUPERVISOR"]}>
                            <LecturerDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/supervisor/approvals"
                    element={
                        <PrivateRoute allowedRoles={["SUPERVISOR"]}>
                            <SupervisorApprovals />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default Routers;
