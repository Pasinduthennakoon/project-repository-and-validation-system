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
                params : { userId }, 
                headers: { Authorization: `Bearer ${token}` } }
        );
        return { ok: true, data: response.data };
    }catch (error) {
        console.error("Update profile error:", error);
        return{ ok: false, message: error.response?.data?.message || "Failed to update profile."}
    }

    }
  
};

export default userService;