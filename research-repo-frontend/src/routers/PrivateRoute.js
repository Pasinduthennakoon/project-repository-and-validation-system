import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in → redirect to home
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but not allowed
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-500">You are not authorized to view this page.</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
