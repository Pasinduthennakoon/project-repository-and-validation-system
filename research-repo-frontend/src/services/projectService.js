// src/services/projectService.js

import axios from 'axios';
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
            const response = await apiClient.get(`/project/my_projects`,{
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
    }
};

export default projectService;