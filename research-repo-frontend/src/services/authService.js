// src/services/authService.js
import axios from 'axios';

// Use environment variables. Fallback to localhost if not set.
// If using Vite: import.meta.env.VITE_API_BASE_URL
// If using Create React App: process.env.REACT_APP_API_BASE_URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";

const getAuthToken = () => {
  return localStorage.getItem("token");
}

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authService = {
  
  // --- 1. LOGIN ---
  login: async (credentials) => {
    try {
      const response = await apiClient.post(`/user/login`, credentials);
      
      // ⚠️ CRITICAL: Handle the Token
      // If your backend returns a JWT (e.g., response.data.token), save it here.
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      return { ok: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed due to network error.";
      return { ok: false, message: message };
    }
  },

  // --- 2. SIGNUP (STUDENT) ---
  signupStudent: async (data) => {
    try {
      const payload = {
        userName: data.name,
        department: data.department,
        email: data.email,
        role: data.role, 
        password: data.password,
        regNo: data.regNo,
        batch: data.batch,
        activeState: true 
      };
      console.log("Signup Student Payload:", payload);

      const response = await apiClient.post(`/student/save`, payload);
      return { ok: true, status: "APPROVED", message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || "Student registration failed.";
      return { ok: false, message: message };
    }
  },

  // --- 3. SIGNUP (SUPERVISOR/ADMIN - PENDING) ---
  signupPending: async (data) => {
    try {
      const payload = {
        userName: data.name,
        department: data.department,
        email: data.email,
        role: data.role, // "SUPERVISOR" or "ADMIN"
        password: data.password,
      };

      const response = await apiClient.post(`/pending_user/save`, payload);
      return { ok: true, status: "PENDING", message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || "Registration request failed.";
      return { ok: false, message: message };
    }
  },

  // --- 4. LOGOUT (Optional Helper) ---
  logout: () => {
    localStorage.removeItem("token");
    // Optionally redirect the user or clear global state here
  },

  /**
     * @param {number} userId 
     * @param {object} passwordDetails - { oldPassword, newPassword, confirmPassword }
     * @returns {object} { ok: boolean, message: string }
     */
    changePassword: async (userId, passwordDetails) => {
        // Alignment with Java DTO: ChangePasswordRequestDTO
        const backendPayload = {
            currentPassword: passwordDetails.oldPassword,
            newPassword: passwordDetails.newPassword,
            confirmationPassword: passwordDetails.confirmPassword,
        };
        
        try {
            const token = getAuthToken();
            if (!token) {
                return { ok: false, message: "Authentication failed. Token not found." };
            }

            // ✅ Uses PUT mapping to match the backend PasswordController
            const response = await apiClient.put(
                `/password/change`,
                backendPayload,
                { 
                    params: { userId }, // Appends ?userId=...
                    headers: { Authorization: `Bearer ${token}` } // Sends JWT
                }
            );

            // Assuming a successful 200 response with StandardResponse body
            return { ok: true, message: response.data.message || "Password changed successfully." };

        } catch (error) {
            console.error("Change password API error:", error.response || error);
            
            const errorMessage = error.response?.data?.message 
                               || error.message 
                               || "Failed to connect to server.";
            
            return { ok: false, message: errorMessage };
        }
    },

    deleteAccount: async (userId) => {
        try {
            const token = getAuthToken();
            if (!token) {
                return { ok: false, message: "Session expired. Please log in." };
            }
            
            // Sends DELETE request to the backend
            const response = await apiClient.delete(`/user/delete`, 
              {
                params: { userId },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Clean up local storage after successful deletion
            localStorage.removeItem("token");
            localStorage.removeItem("auth_user");
            
            return { ok: true, message: response.data.message || "Account successfully deleted." };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete account.";
            return { ok: false, message: errorMessage };
        }
    }
};

export default authService;