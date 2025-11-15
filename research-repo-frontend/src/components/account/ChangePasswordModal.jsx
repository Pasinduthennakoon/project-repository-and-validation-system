import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ChangePasswordModal({ visible, onClose }) {
  const { changePassword } = useAuth();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  if (!visible) return null;

  const submit = () => {
    const result = changePassword(oldPass, newPass);

    if (!result.ok) {
      alert(result.message);
      return;
    }

    alert("Password changed!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-96 p-5 rounded shadow">
        <h2 className="font-bold text-xl mb-4">Change Password</h2>

        <input
          type="password"
          className="w-full border p-2 rounded mb-3"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-3"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submit}>
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
