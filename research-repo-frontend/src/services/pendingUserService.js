import apiClient from "./apiClient";

import React from 'react'

const pendingUserSetvice = {
    fetchPendingUsers: async () => {
        try {
            const response = await apiClient.get('/pending_user/view/pending_users'); 
            
                        if (response.data.code === 201) {
                            return { ok: true, data: response.data.data };
                        }
                        throw new Error(response.data.message || 'Failed to fetch pending users.');
        }catch (error) {
            const message = error.response?.data?.message || 'Network error fetching pending users.';
            return { ok: false, message: message };
        }
    }
}

export default pendingUserSetvice