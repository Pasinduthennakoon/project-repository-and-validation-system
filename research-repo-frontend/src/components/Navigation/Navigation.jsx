// src/components/Navigation/Navigation.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthModal from "../AuthModel/AuthModal";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [intendedPath, setIntendedPath] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    if (!user) {
      setIntendedPath(path);
      setShowAuth(true);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    if (user) {
      setShowAuth(false);
      if (intendedPath) {
        navigate(intendedPath);
        setIntendedPath(null);
      }
    }
  }, [user]);

  const activeClass =
    "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200";
  const normalClass =
    "text-gray-600 hover:text-blue-600 transition-all duration-200";

  // Role-based link mapping
  const roleLinks = {
    STUDENT: [
      { path: "/projects", label: "Browse", protected: true },
      { path: "/ideavalidation", label: "Validation", protected: true },
      { path: "/upload", label: "Upload" },
      { path: "/student/dashboard", label: "Dashboard" },
    ],
    SUPERVISOR: [
      { path: "/projects", label: "Browse", protected: true },
      { path: "/ideavalidation", label: "Validation", protected: true },
      { path: "/lecturer/dashboard", label: "Review Projects" },
      { path: "/supervisor/approvals", label: "Approvals" },
    ],
    ADMIN: [
      { path: "/admin/dashboard", label: "Analyse" },
      { path: "/admin/users", label: "User Management" },
      { path: "/admin/approvals", label: "Signup Approvals" }
    ],
  };

  const userLinks = roleLinks[user?.role] || [];

  return (
    <>
      <nav className="flex items-center py-6 px-16 justify-between bg-white shadow-sm">
        {/* Logo */}
        <NavLink to="/" className="text-3xl font-bold text-blue-600">
          Research Repo.
        </NavLink>

        {/* Navigation Links */}
        <ul className="flex gap-10 font-semibold">
          {/* Home is always visible */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>
          </li>

          {/* Role-based links */}
          {userLinks.map((link) => (
            <li key={link.path}>
              {link.protected ? (
                <NavLink
                  to={link.path}
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      handleProtectedClick(link.path);
                    }
                  }}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div>
          {!user ? (
            <button
              onClick={() => {
                setIntendedPath(null);
                setShowAuth(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navigation;
