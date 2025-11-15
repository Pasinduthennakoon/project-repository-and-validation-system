import React, { createContext, useContext, useEffect, useState } from "react";
import usersData from "../data/users.json";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const LOCAL_USERS_KEY = "local_users";
  const SESSION_KEY = "auth_user";

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load saved session
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Load mock users + localStorage users
  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const combined = [...usersData, ...localUsers];
    setUsers(combined);
  }, []);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const loginUser = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) return { ok: false, message: "Invalid credentials" };
    if (found.status === "PENDING")
      return { ok: false, message: "Account pending approval" };
    if (found.status === "REJECTED")
      return { ok: false, message: "Account rejected" };

    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));

    return { ok: true, user: found };
  };

  // -----------------------------
  // SIGNUP
  // -----------------------------
  const signupUser = (newUser) => {
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) return { ok: false, message: "Email already registered" };

    const status = newUser.role === "STUDENT" ? "APPROVED" : "PENDING";
    const finalUser = {
      ...newUser,
      id: Date.now(),
      status,
      profilePhoto: null,
    };

    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const updatedLocal = [...localUsers, finalUser];

    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedLocal));
    setUsers((prev) => [...prev, finalUser]);

    return { ok: true, user: finalUser };
  };

  // -----------------------------
  // UPDATE PROFILE (name, email, photo)
  // -----------------------------
  const updateProfile = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };

    setUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    // Update in local storage if exists
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const updatedLocal = localUsers.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedLocal));
  };

  // -----------------------------
  // CHANGE PASSWORD
  // -----------------------------
  const changePassword = (oldPass, newPass) => {
    if (user.password !== oldPass) {
      return { ok: false, message: "Old password is incorrect" };
    }

    const updated = { ...user, password: newPass };

    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));

    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const updatedLocal = localUsers.map((u) =>
      u.id === updated.id ? updated : u
    );

    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedLocal));

    return { ok: true };
  };

  // -----------------------------
  // DELETE ACCOUNT
  // -----------------------------
  const deleteAccount = () => {
    const localUsers = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");

    // Remove from local users list
    const updatedLocal = localUsers.filter((u) => u.id !== user.id);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedLocal));

    // Remove session
    setUser(null);
    localStorage.removeItem(SESSION_KEY);

    return { ok: true };
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loginUser,
        signupUser,
        logout,
        updateProfile,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
