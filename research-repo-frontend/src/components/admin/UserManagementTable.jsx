import React, { useState, useEffect, useMemo } from "react";

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [regFilter, setRegFilter] = useState("");

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setLoading(false);
      });
  }, []);

  // Dynamic filter options
  const roles = useMemo(() => [...new Set(users.map((u) => u.role))], [users]);
  const departments = useMemo(
    () => [...new Set(users.map((u) => u.department).filter(Boolean))],
    [users]
  );

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter ? u.role === roleFilter : true;
      const matchesDept = departmentFilter
        ? u.department === departmentFilter
        : true;
      const matchesBatch =
        roleFilter === "STUDENT" && batchFilter
          ? u.batch === batchFilter
          : true;
      const matchesReg =
        roleFilter === "STUDENT" && regFilter ? u.reg === regFilter : true;

      return matchesRole && matchesDept && matchesBatch && matchesReg;
    });
  }, [users, roleFilter, departmentFilter, batchFilter, regFilter]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("User deleted (mock)");
    }
  };

  if (loading) return <p>Loading users...</p>;

  // Show Batch and RegNo columns only if role filter is STUDENT
  const showStudentColumns = roleFilter === "STUDENT";

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Only show these filters if role filter is STUDENT */}
        {showStudentColumns && (
          <>
            <input
              type="text"
              placeholder="Batch"
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Reg No"
              value={regFilter}
              onChange={(e) => setRegFilter(e.target.value)}
              className="border p-2 rounded"
            />
          </>
        )}
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Department</th>
              {showStudentColumns && (
                <>
                  <th className="py-2 px-4 border">Batch</th>
                  <th className="py-2 px-4 border">Reg No</th>
                </>
              )}
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">{user.department || "-"}</td>
                {showStudentColumns && (
                  <>
                    <td className="py-2 px-4 border">{user.batch || "-"}</td>
                    <td className="py-2 px-4 border">{user.reg || "-"}</td>
                  </>
                )}
                <td className="py-2 px-4 border">{user.status}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={showStudentColumns ? 8 : 5}
                  className="py-4 text-center text-gray-500"
                >
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
