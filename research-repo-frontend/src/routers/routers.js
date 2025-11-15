import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Upload from "../Pages/Upload";
import ProjectDetails from "../Pages/ProjectDetails";
import IdeaComparisonPage from "../Pages/IdeaComparisonPage";
import SupervisorValidationPage from "../Pages/SupervisorValidationPage";
import DocumentationPage from "../Pages/DocumentationPage";
import AdminDashboard from "../Pages/AdminDashboard";
import StudentDashboard from '../Pages/StudentDashboard'
import LecturerDashboard from "../Pages/LecturerDashboard";
import SupervisorApprovals from "../Pages/SupervisorApprovals";
import PrivateRoute from "./PrivateRoute"; // ✅ import
import RecentProjectsPage from "../Pages/RecentProjectsPage";
import UserManagementPage from "../Pages/UserManagementPage";
import AdminApprovalPage from "../Pages/AdminApprovalPage";
import SupervisorDashboard from "../Pages/SupervisorDashboard";
import { useAuth } from "../context/AuthContext";
import Account from "../Pages/Account";

const Routers = () => {
    const { user } = useAuth();

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
                    path="/student/upload"
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
                    path="/student/ideavalidation"
                    element={
                        <PrivateRoute allowedRoles={["STUDENT"]}>
                            <IdeaComparisonPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/supervisor/ideavalidation"
                    element={
                        <PrivateRoute allowedRoles={["SUPERVISOR"]}>
                            <SupervisorValidationPage />
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
                    path="/student/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["STUDENT"]}>
                            <StudentDashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/supervisor/reviews"
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

                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/project/table"
                    element={
                        <PrivateRoute allowedRoles={["ADMIN", "SUPERVISOR"]}>
                            <RecentProjectsPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                            <UserManagementPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin/approvals"
                    element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                            <AdminApprovalPage adminDepartment={user?.department} />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/supervisor/dashboard"
                    element={
                        <PrivateRoute allowedRoles={["SUPERVISOR"]}>
                            <SupervisorDashboard />
                        </PrivateRoute>
                    }
                />

                <Route 
                    path="/account" 
                    element={
                        <PrivateRoute> 
                            <Account/>
                        </PrivateRoute>
                    } 
                />

            </Routes>
        </div>
    );
};

export default Routers;
