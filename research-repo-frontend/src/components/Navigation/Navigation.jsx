import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthModal from "../AuthModel/AuthModal";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const activeClass =
    "text-blue-600 border-b-2 border-blue-600 pb-1 transition-all duration-200";
  const normalClass =
    "text-gray-600 hover:text-blue-600 transition-all duration-200";

  const roleLinks = {
    STUDENT: [
      { path: "/projects", label: "Browse" },
      { path: "/student/ideavalidation", label: "Validation" },
      { path: "/student/upload", label: "Upload" },
      { path: "/student/dashboard", label: "Analyse" },
    ],
    SUPERVISOR: [
      { path: "/projects", label: "Browse" },
      { path: "/supervisor/ideavalidation", label: "Validation" },
      { path: "/supervisor/reviews", label: "Review Projects" },
      { path: "/supervisor/approvals", label: "Approvals" },
      { path: "/supervisor/dashboard", label: "Analyse" },
    ],
    ADMIN: [
      { path: "/admin/dashboard", label: "Analyse" },
      { path: "/admin/users", label: "User Management" },
      { path: "/admin/approvals", label: "Signup Approvals" },
    ],
  };

  const links = roleLinks[user?.role] || [];

  return (
    <>
      <nav className="flex items-center py-6 px-16 justify-between bg-white shadow-sm relative z-[999999]">
        <NavLink to="/" className="text-3xl font-bold text-blue-600">
          Research Repo.
        </NavLink>

        <ul className="flex gap-10 font-semibold">
          {user && (
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
          )}

          {links.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* AUTH / PROFILE */}
        {!user ? (
          <button
            onClick={() => setShowAuth(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            <img
              onClick={() => setDropdown(!dropdown)}
              src={user.photo || "/default-user.png"}
              className="w-10 h-10 rounded-full cursor-pointer border"
              alt="profile"
            />

            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-[999999]">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setDropdown(false);
                    navigate("/account");
                  }}
                >
                  My Account
                </button>

                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <AuthModal visible={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
};

export default Navigation;
