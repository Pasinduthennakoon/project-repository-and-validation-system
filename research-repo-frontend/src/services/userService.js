import { message } from "antd";
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";


const getAuthToken = () => {
    return localStorage.getItem("token");
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

const userService = {

    /**
     * @param { Number } userId
     * @param { Object } updatedDetails
     * @returns { Object }
     */

    updataProfile: async (userId, updatedDetails) => {

        try {

            const backendPayload = {
                userName: updatedDetails.name,
                email: updatedDetails.email,
            };

            const token = getAuthToken();
            if (!token) {
                throw new Error("Authentication token not found.");
            }

            const response = await apiClient.put(`/user/update`, backendPayload,
                {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return { ok: true, data: response.data };
        } catch (error) {
            console.error("Update profile error:", error);
            return { ok: false, message: error.response?.data?.message || "Failed to update profile." }
        }

    }, 

    deleteUser: async (userId) => {
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
            
            return { ok: true, message: response.data.message || "User successfully deleted." };
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete user.";
            return { ok: false, message: errorMessage };
        }
    },

    /**
     * @param {string} role
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    fetchUsers : async (role) => {
        try {
            // No need to send supervisorId; the backend extracts it from the JWT.
            const response = await apiClient.get('/user/user_management', 
                {params: {role}}); 

            if (response.data.code === 201) {
                return { ok: true, data: response.data.data };
            }
            throw new Error(response.data.message || 'Failed to fetch users.');
        } catch (error) {
            const message = error.response?.data?.message || 'Network error fetching users.';
            return { ok: false, message: message };
        }
    }

};

export default userService;