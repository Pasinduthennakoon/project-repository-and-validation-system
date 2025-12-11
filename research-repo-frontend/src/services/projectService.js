// src/services/projectService.js

import axios from 'axios';
import { comment } from 'postcss';
import { useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const projectService = {
    // FIX: Pass the userId in the 'params' field of the configuration object.
    fetchMyProjects: async (userId) => {
        try {
            // const userId = Number(localStorage.getItem('userId'));
            // Request URL will be: /project/my_projects?userId=123
            const response = await apiClient.get(`/project/my_projects`, {
                params: { userId }
            });

            // ... (mapping logic and return) ...
            const mappedData = response.data.data.map(project => ({
                id: project.projectId,
                title: project.title,
            }));

            return { ok: true, data: mappedData };
        } catch (error) {
            const message = error.response?.data?.message || "Failed to fetch projects.";
            return { ok: false, message: message };
        }
    },

    /**
     * @param {FormData} formData - The FormData object containing 'data' (JSON blob) and 'file'.
     * @returns {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    addNewProject: async (formData) => {

        try {
            const response = await apiClient.post('/pending_projects/save', formData);
            const responseData = response.data;

            if (responseData.code !== 201) {
                throw new Error(
                    responseData.message || "Submission failed with unexpected status."
                );
            }
            return { ok: true, data: responseData.data, message: responseData.message };
        } catch (error) {
            let message = "Failed to submit project: Check network connection.";
            if (error.response) {
                // Server responded with non-2xx status or custom error message
                message = error.response.data.message || `Server error (Status ${error.response.status}).`;
            } else if (error.message.includes("Submission failed")) {
                // Catch the error thrown above from the custom status check
                message = error.message;
            }

            console.error("API Submission Error:", error);
            return { ok: false, message: message };
        }
    },

    /**
     * @param {object} data - The CommentSaveRequestDTO payload.
     * @param {number} supervisorId - The ID of the user submitting the review.
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    submitReview: async (supervisorId, data) => {
        try {

            const response = await apiClient.post('/project/comment/add_comment', data, 
                {params: { supervisorId }}
            );

            const responseData = response.data;

            if (responseData.code === 201) {
                return {
                    ok: true,
                    data: responseData.data,
                    message: responseData.message
                };
            }

            throw new Error(responseData.message || "Failed to submit review.");
        } catch (error) {
            let message = "Network error: Failed to submit review.";
            if (error.response) {
                // Get error message from StandardResponse if available
                message = error.response.data.message || `Server error (Status ${error.response.status}).`;
            }
            console.error("Review Submission Error:", error);
            return { ok: false, message: message };
        }
    },

    /**
     * @param {number} supervisorId
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    fetchProjectsForReview: async (supervisorId) => {
        try {
            
            // apiClient automatically attaches the JWT token
            const response = await apiClient.get('/project/comment/view_projects',
                { params: { supervisorId } }
            ); 
            const responseData = response.data;

            // Check for the backend's expected success code (201 or 200)
            if (responseData.code === 201 || responseData.code === 200) { 
                return { 
                    ok: true, 
                    data: responseData.data 
                };
            }
            
            throw new Error(responseData.message || "Failed to fetch projects.");
            
        } catch (error) {
            let message = error.response?.data?.message || "Network error or server failed to fetch review list.";
            console.error("Fetch Review Projects Error:", error);
            return { ok: false, message: message };
        }
    },
};

export default projectService;