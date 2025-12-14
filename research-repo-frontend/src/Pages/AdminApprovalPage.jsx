import React, { useEffect, useState, useMemo } from "react";
import pendingUserService from "../services/pendingUserService";

const AdminApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const apiRole = roleFilter === "All Roles" ? "" : roleFilter;

    const fetchPendingUsers = async () => {
      try {
        const result = await pendingUserService.fetchPendingUsers();

        if (!result.ok) {
          throw new Error(result.message);
        }

        setRequests(result.data || []); // Set state with fetched data
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch pending users:", err);
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  // Get dynamic filter options
  const roles = useMemo(
    () => [...new Set(requests.map((r) => r.role))],
    [requests]
  );
  const departments = useMemo(
    () => [...new Set(requests.map((r) => r.department).filter(Boolean))],
    [requests]
  );

  // Filtered requests based on selected role/department
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesRole = roleFilter ? r.role === roleFilter : true;
      const matchesDept = departmentFilter
        ? r.department === departmentFilter
        : true;
      return matchesRole && matchesDept;
    });
  }, [requests, roleFilter, departmentFilter]);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert("Signup approved (mock)");
  };

  const handleReject = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    alert("Signup rejected (mock)");
  };

  if (loading) return <p>Loading pending requests...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Pending Signup Approvals</h1>

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
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-gray-500">No pending requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{req.userName}</td>
                  <td className="py-2 px-4 border">{req.email}</td>
                  <td className="py-2 px-4 border">{req.role}</td>
                  <td className="py-2 px-4 border">{req.department}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalPage;
