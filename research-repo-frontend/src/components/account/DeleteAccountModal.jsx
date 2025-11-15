import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function DeleteAccountModal({ visible, onClose }) {
  const { deleteAccount } = useAuth();

  if (!visible) return null;

  const handleDelete = () => {
    deleteAccount();
    alert("Account Deleted!");
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
        <p>This action cannot be undone. Are you sure?</p>

        <div className="flex justify-end gap-3 mt-5">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
