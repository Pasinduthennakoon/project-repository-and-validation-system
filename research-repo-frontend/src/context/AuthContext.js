import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in user
  const [users, setUsers] = useState([]); // combined users list (public + local signups)
  const LOCAL_USERS_KEY = "local_users";

  // load saved session
  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // load users.json (public) + local users from localStorage
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/users.json");
        const publicUsers = await res.json();
        const local = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
        // combine (local users override by email if duplicates)
        const combined = [...publicUsers, ...local];
        setUsers(combined);
      } catch (err) {
        console.error("Failed to load users.json", err);
        const local = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
        setUsers(local);
      }
    };
    load();
  }, []);

  // login function
  const loginUser = ({ email, password }) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: "Invalid credentials" };
    if (found.status === "PENDING") return { ok: false, message: "Account pending approval" };
    if (found.status === "REJECTED") return { ok: false, message: "Account rejected" };

    setUser(found);
    localStorage.setItem("auth_user", JSON.stringify(found));
    return { ok: true, user: found };
  };

  // signup: store into localStorage local users (APPROVED for STUDENT, PENDING for others)
  const signupUser = (payload) => {
    const { email, name, password, role = "STUDENT" } = payload;
    if (users.find((u) => u.email === email)) {
      return { ok: false, message: "Email already registered" };
    }
    const status = role === "STUDENT" ? "APPROVED" : "PENDING";
    const local = JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || "[]");
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      status,
    };
    const updatedLocal = [...local, newUser];
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedLocal));
    // update in-memory users so login can see it immediately
    setUsers((prev) => [...prev, newUser]);
    return { ok: true, user: newUser, status };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, users, loginUser, signupUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
