import React, { useState, useEffect, useMemo } from "react";

const ALL_ROLES = ["All Roles", "ADMIN", "STUDENT", "SUPERVISOR"];

const UserManagementTable = () => {
  const [users, setUsers] = useState([]); // array of DTOs
  const [loading, setLoading] = useState(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [batchSearch, setBatchSearch] = useState("");
  const [regSearch, setRegSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const apiRole = roleFilter === "All Roles" ? "" : roleFilter;

    fetch(`/api/v1/user/user_management?role=${apiRole}`)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data); // ✅ Correct
        setLoading(false);

        // Reset client-side filters when role changes
        setDepartmentFilter("");
        setBatchSearch("");
        setRegSearch("");
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, [roleFilter]);

  // dynamic options
  const departments = useMemo(() => [...new Set(users.map((u) => u.department).filter(Boolean))], [users]);

  // client-side filters
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesDept = departmentFilter ? u.department === departmentFilter : true;
      const matchesBatch = roleFilter === "STUDENT" && batchSearch
        ? (u.batch || "").toLowerCase().includes(batchSearch.toLowerCase())
        : true;
      const matchesReg = roleFilter === "STUDENT" && regSearch
        ? (u.regNo || "").toLowerCase().includes(regSearch.toLowerCase())
        : true;
      return matchesDept && matchesBatch && matchesReg;
    });
  }, [users, roleFilter, departmentFilter, batchSearch, regSearch]);

  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    fetch(`/api/v1/user/${userId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((payload) => {
        // payload: StandardResponse {code, message, data}
        if (payload.code === 200) {
          setUsers((prev) => prev.filter((u) => u.userId !== userId));
          alert("User deleted successfully");
        } else {
          alert("Delete failed: " + payload.message);
        }
      })
      .catch((err) => {
        console.error("Delete error", err);
        alert("Failed to delete user");
      });
  };

  if (loading) return <p className="text-center py-8">Loading users...</p>;

  const showStudentColumns = roleFilter === "STUDENT";

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border p-2 rounded">
          {ALL_ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All Departments</option>
          {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
        </select>

        {showStudentColumns && (
          <>
            <input type="text" placeholder="Batch Search" value={batchSearch} onChange={(e) => setBatchSearch(e.target.value)} className="border p-2 rounded" />
            <input type="text" placeholder="Reg No Search" value={regSearch} onChange={(e) => setRegSearch(e.target.value)} className="border p-2 rounded" />
          </>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border text-left">Name</th>
              <th className="py-2 px-4 border text-left">Email</th>
              <th className="py-2 px-4 border text-left">Role</th>
              <th className="py-2 px-4 border text-left">Department</th>
              {showStudentColumns && (
                <>
                  <th className="py-2 px-4 border text-left">Batch</th>
                  <th className="py-2 px-4 border text-left">Reg No</th>
                </>
              )}
              <th className="py-2 px-4 border text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.userId} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{u.userName}</td>
                <td className="py-2 px-4 border">{u.email}</td>
                <td className="py-2 px-4 border">{u.role}</td>
                <td className="py-2 px-4 border">{u.department || "-"}</td>

                {showStudentColumns && (
                  <>
                    <td className="py-2 px-4 border">{u.batch || "-"}</td>
                    <td className="py-2 px-4 border">{u.regNo || "-"}</td>
                  </>
                )}

                <td className="py-2 px-4 border">
                  <button onClick={() => handleDelete(u.userId)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={showStudentColumns ? 7 : 5} className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
