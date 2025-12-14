import apiClient from "./apiClient";

import React from 'react'

const pendingUserService = {
    fetchPendingUsers: async () => {
        try {
            const response = await apiClient.get('/pending_user/view/pending_users');

            if (response.data.code === 201) {
                return { ok: true, data: response.data.data };
            }
            throw new Error(response.data.message || 'Failed to fetch pending users.');
        } catch (error) {
            const message = error.response?.data?.message || 'Network error fetching pending users.';
            return { ok: false, message: message };
        }
    },

    /**
     * @param { Number } pendingId
     *  @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    approvePendingUser: async (pendingId) => {
        try {
            const response = await apiClient.post('/user/approve_user', null,
                { params: { pendingId } });
            if (response.data.code === 201) {
                return { ok: true, data: response.data.data };
            }
            throw new Error(response.data.message || 'Failed to approve pending user.');
        } catch (error) {
            const message = error.response?.data?.message || 'Network error approving pending user.';
            return { ok: false, message: message };
        }
    },

    /**
     * @param { Number } pendingId
     *  @return {Promise<{ok: boolean, data?: any, message?: string}>}
     */
    rejectPendingUser: async (pendingId) => {
        try {
            const response = await apiClient.delete('/user/reject_user',
                { params: { pendingId } });
            if (response.data.code === 201) {
                return { ok: true, data: response.data.data };
            }
            throw new Error(response.data.message || 'Failed to reject pending user.');
        } catch (error) {
            const message = error.response?.data?.message || 'Network error rejecting pending user.';
            return { ok: false, message: message };
        }
    }
};

export default pendingUserService