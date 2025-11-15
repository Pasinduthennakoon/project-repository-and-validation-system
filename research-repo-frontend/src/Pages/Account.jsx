import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { sampleProjects } from "../data/data";
import Badge from "../components/account/Badge";
import DeleteAccountModal from "../components/account/DeleteAccountModal";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    reg: user.reg || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [photo, setPhoto] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const myProjects = sampleProjects.filter((p) => p.uploadedBy === user.id);

  // Save profile changes
  const saveProfile = () => {
    updateProfile({
      name: form.name,
      email: form.email,
      reg: form.reg,
    });
    alert("Profile updated");
  };

  // Upload / Change profile photo
  const uploadPhoto = () => {
    if (!photo) return alert("Choose an image first");

    const imgURL = URL.createObjectURL(photo);
    updateProfile({ photo: imgURL });
    setShowPhotoModal(false);
    alert("Profile photo updated");
  };

  // Delete profile photo
  const deletePhoto = () => {
    updateProfile({ photo: null });
    setShowPhotoModal(false);
    alert("Profile photo deleted");
  };

  // Change password
  const handleChangePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordForm;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match");
    }

    changePassword(oldPassword, newPassword);
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    alert("Password changed successfully");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 flex gap-10">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white p-5 rounded shadow">
        {/* Sidebar photo → circular */}
        <img
          src={
            user.photo || "/default-user.png"
          }
          className="w-24 h-24 rounded-full border mx-auto mb-3 cursor-pointer hover:scale-105 transition object-cover"
          onClick={() => setShowPhotoModal(true)}
        />

        <h2 className="text-center text-xl font-bold">{user.name}</h2>
        <p className="text-center text-gray-600">{user.email}</p>

        <div className="text-center mt-2">
          <Badge role={user.role} />
        </div>

        <hr className="my-5" />

        <ul className="space-y-3">
          <li
            className={`cursor-pointer ${
              activeTab === "profile" ? "font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "projects" ? "font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("projects")}
          >
            My Projects
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "password" ? "font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </li>
          <li
            className="cursor-pointer text-red-600"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-white p-6 rounded shadow">
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <>
            <h2 className="text-xl font-bold mb-5">Profile Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="font-semibold">Name</label>
                <input
                  className="w-full border p-2 rounded mt-1"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="font-semibold">Email</label>
                <input
                  className="w-full border p-2 rounded mt-1"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {user.role === "STUDENT" && (
                <div>
                  <label className="font-semibold">Registration No</label>
                  <input
                    className="w-full border p-2 rounded mt-1"
                    value={form.reg}
                    onChange={(e) => setForm({ ...form, reg: e.target.value })}
                  />
                </div>
              )}

              <div>
                <label className="font-semibold">Department</label>
                <input
                  className="w-full border p-2 rounded mt-1 bg-gray-100"
                  value={user.department}
                  disabled
                />
              </div>

              {user.batch && (
                <div>
                  <label className="font-semibold">Batch</label>
                  <input
                    className="w-full border p-2 rounded mt-1 bg-gray-100"
                    value={user.batch}
                    disabled
                  />
                </div>
              )}

              <button
                onClick={saveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </>
        )}

        {/* CHANGE PASSWORD TAB */}
        {activeTab === "password" && (
          <>
            <h2 className="text-xl font-bold mb-5">Change Password</h2>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="font-semibold">Old Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded mt-1"
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">New Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded mt-1"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full border p-2 rounded mt-1"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update Password
              </button>
            </div>
          </>
        )}

        {/* MY PROJECTS TAB */}
        {activeTab === "projects" && (
          <>
            <h2 className="text-xl font-bold mb-5">My Projects</h2>

            {myProjects.length === 0 ? (
              <p className="text-gray-600">You have no uploaded projects.</p>
            ) : (
              <ul className="space-y-3">
                {myProjects.map((p) => (
                  <li
                    key={p.id}
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>

      {/* PHOTO MODAL (Passport-style square) */}
      {showPhotoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowPhotoModal(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>

            <img
              src={
                user.photo || "/default-user.png"
              }
              alt="Profile"
              className="w-48 h-48 mx-auto mb-4 object-cover border rounded-md"
            />

            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="mb-3"
            />

            <button
              onClick={uploadPhoto}
              className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2 hover:bg-green-700"
            >
              Change Photo
            </button>
            <button
              onClick={deletePhoto}
              className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
            >
              Delete Photo
            </button>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
