import api from '../utils/api';

export const getAllAlerts = () => api.get('/alerts');
export const getUnreadAlerts = () => api.get('/alerts/unread');
export const markAlertAsRead = (id) => api.patch(`/alerts/${id}/read`);
export const resolveAlert = (id) => api.patch(`/alerts/${id}/resolve`);
