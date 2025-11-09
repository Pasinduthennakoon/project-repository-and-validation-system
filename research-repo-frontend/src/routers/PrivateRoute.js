import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If specific roles are required (like ADMIN or SUPERVISOR)
  if (allowedRoles && !allowedRoles.includes(user.role?.toUpperCase())) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600">
          You are not authorized to view this page.
        </p>
      </div>
    );
  }

  // ✅ User authorized
  return children;
};

export default PrivateRoute;
