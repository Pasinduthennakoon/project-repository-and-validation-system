import React from "react";
import UserManagementTable from "../components/admin/UserManagementTable";

const UserManagementPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <UserManagementTable />
    </div>
  );
};

export default UserManagementPage;
