import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import userService from "../services/userService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const SESSION_KEY = "auth_user";
  const LOCAL_USERS_KEY = "local_users"; // For local user storage (mock DB)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved session (e.g., JWT token or minimal user object)
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved && saved !== "undefined") {
      try {
        const parsedUser = JSON.parse(saved);
        setUser(parsedUser);
      } catch (error) {
        console.error("Corrupt session data found, clearing storage.", error);
        // If the JSON is bad, clear it so the app doesn't crash next time
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      }
    } else {
      // If it was "undefined" or null, ensure we clean up
      localStorage.removeItem(SESSION_KEY);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  // -----------------------------
  // LOGIN
  // -----------------------------
  // In AuthProvider
  // AuthContext.js

  const loginUser = async ({ email, password }) => {
    try {
      // ⚠️ API CALL: Hitting the backend login endpoint
      const result = await authService.login({ email, password });

      if (!result.ok) {
        // Handles network errors or non-200 responses from authService
        return { ok: false, message: result.message };
      }

      // 1. Get Token and User Profile from the 'data' field.
      // The rest operator (...) puts everything EXCEPT 'token' into userProfile.
      const { token, ...userProfile } = result.data.data;

      // 2. CRITICAL CHECK: Enforce the token's existence.
      // This is the check that is being triggered when a token is NOT sent.
      if (!token || typeof token !== 'string' || token.length < 5) {
        // If a login attempt *succeeds* (result.ok is true) but returns no valid token,
        // it indicates a server configuration error.
        return {
          ok: false,
          message: "Authentication successful, but the server failed to issue a valid token."
        };
      }

      // 3. Save the TOKEN (for authorization)
      localStorage.setItem("token", token);

      // 4. Save the user profile data to state (for display/context)
      setUser(userProfile);

      // Use a separate key to save the user data if needed for quick load, 
      // though the token is the primary session key.
      localStorage.setItem(SESSION_KEY, JSON.stringify(userProfile));

      return { ok: true, user: userProfile };

    } catch (error) {
      // Handles unexpected exceptions during the function execution
      console.error("Login unexpected error:", error);
      return { ok: false, message: "An unexpected error occurred during login." };
    }
  };

  // -----------------------------
  // SIGNUP
  // -----------------------------
  async function signupUser(newUser) {
    try {
      let result;

      // ⚠️ ROLE-BASED API CALL: Directing to the correct backend endpoint
      if (newUser.role === "STUDENT") {
        // Hitting the /students/save endpoint (immediate approval)
        result = await authService.signupStudent(newUser);
      } else {
        // Hitting the /pending/save endpoint (pending approval)
        result = await authService.signupPending(newUser);
      }

      if (!result.ok) {
        return { ok: false, message: result.message };
      }

      // Success, but the user is not logged in immediately.
      // The status comes from the backend response.
      return {
        ok: true,
        status: result.status, // e.g., "APPROVED" or "PENDING"
        message: result.message
      };

    } catch (error) {
      return { ok: false, message: "Network error during signup." };
    }
  }

  // -----------------------------
  // UPDATE PROFILE (name, email, photo)
  // -----------------------------
  // ✅ CORRECTED LOGIC for updateProfile
  const updateProfile = async (updatedDetails) => {
    try {
      // 1. Call the service (assuming you fix the function name to updateProfile later)
      const result = await userService.updataProfile(user.userId, updatedDetails);

      if (result.ok) { // <-- SUCCESS PATH

        // 2. Update local state with the successfully saved details
        setUser(prevUser => ({
          ...prevUser,
          userName: updatedDetails.name,
          email: updatedDetails.email,
        }));

        // 3. Update persistent storage (localStorage)
        const updatedUser = {
          ...user,
          userName: updatedDetails.name,
          email: updatedDetails.email
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

        return { ok: true }; // Success returned to the Account component

      } else { // <-- FAILURE PATH (API returned non-200 or business logic failed)

        console.error("API Error during update: ", result.message);
        // Do NOT update state here. Return the error message.
        return { ok: false, message: result.message };
      }
    } catch (e) { // <-- UNEXPECTED ERROR PATH (Network down, unexpected exception)
      console.error("Network Error or unexpected error during update:", e);
      return { ok: false, message: "An unexpected network error occurred." };
    }
  };

  // -----------------------------
  // CHANGE PASSWORD
  // -----------------------------
  const changePassword = async (oldPass, newPass, confirmPass) => {
    // 1. Client-Side Validation (for fast UX)
    if (!oldPass || !newPass || !confirmPass) {
      return { ok: false, message: "Please fill all password fields." };
    }
    if (newPass !== confirmPass) {
      return { ok: false, message: "New passwords do not match." };
    }

    const passwordDetails = {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPassword: confirmPass
    };

    try {
      // 2. Call the API service
      const result = await authService.changePassword(user.userId, passwordDetails);

      if (result.ok) {
        // Password changed successfully in the backend
        return { ok: true, message: result.message };
      } else {
        // Backend validation failed (e.g., wrong current password)
        return { ok: false, message: result.message };
      }
    } catch (error) {
      console.error("Error during changePassword context:", error);
      return { ok: false, message: "Network error occurred." };
    }
  };

  // -----------------------------
  // DELETE ACCOUNT
  // -----------------------------
  const deleteAccount = async () => {
    try {
      const result = await authService.deleteAccount(user.userId);

      if (result.ok) {
        // Clear local state only after successful API call
        setUser(null);
        return result;
      } else {
        return result;
      }
    } catch (e) {
      return { ok: false, message: "Network error during account deletion." };
    }
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  // -----------------------------
  // CONTEXT VALUE
  // -----------------------------
  const value = {
    user,
    loading,
    loginUser,
    signupUser,
    logout,
    // Note: updateProfile, changePassword, deleteAccount would also need to be 
    // rewritten to use the authService and hit corresponding backend APIs.
  };

  // Prevent rendering children until session loading is complete
  if (loading) {
    return <div>Loading authentication session...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
