// src/services/pendingProjectService.js

import axios from 'axios';
// Assume apiClient is configured similarly to projectService (with JWT interceptor)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
const apiClient = axios.create({ baseURL: API_BASE_URL });
// ... (Include interceptor logic here if in a separate file) ...

const pendingProjectService = {

    /**
     * @param {number} supervisorId
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    // 1. Fetch Projects for Logged-in Supervisor
    fetchPendingProjects: async (supervisorId) => {
        try {
            // No need to send supervisorId; the backend extracts it from the JWT.
            const response = await apiClient.get('/pending_projects/view', 
                {params: {supervisorId}}); 

            if (response.data.code === 200) {
                return { ok: true, data: response.data.data };
            }
            throw new Error(response.data.message || 'Failed to fetch projects.');
        } catch (error) {
            const message = error.response?.data?.message || 'Network error fetching projects.';
            return { ok: false, message: message };
        }
    },

    /**
     * @param {number} pendingId
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    // 2. Approve Project
    approveProject: async (pendingId) => {
        try {
            // Endpoint: /pending_projects/approve?pendingId={id}
            const response = await apiClient.post('/pending_projects/approve', null,
                {params: {pendingId}}
            );
            console.log("Approval response:", response); // Debug log

            if (response.data.code === 201) {
                return { ok: true, message: response.data.message };
            }
            throw new Error(response.data.message || 'Approval failed.');
        } catch (error) {
            const message = error.response?.data?.message || 'Approval request failed.';
            return { ok: false, message: message };
        }
    },

    /**
     * @param {number} pendingProjectId
     * @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    // 3. Reject Project
    rejectProject: async (pendingProjectId) => {
        try {
            // Endpoint: /pending_projects/reject?pendingProjectId={id}
            const response = await apiClient.delete('/pending_projects/reject',
                {params: { pendingProjectId }}
            );

            if (response.data.code === 200) {
                return { ok: true, message: 'Project rejected successfully.' };
            }
            throw new Error(response.data.message || 'Rejection failed.');
        } catch (error) {
            const message = error.response?.data?.message || 'Rejection request failed.';
            return { ok: false, message: message };
        }
    }
};

export default pendingProjectService;