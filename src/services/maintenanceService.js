import api from '../utils/api';

export const getAllSchedules = () => api.get('/maintenance/schedules');
export const getSchedulesByAsset = (assetId) => api.get(`/maintenance/schedules/asset/${assetId}`);
export const getOverdueSchedules = () => api.get('/maintenance/schedules/overdue');
export const createSchedule = (data) => api.post('/maintenance/schedules', data);
export const deleteSchedule = (id) => api.delete(`/maintenance/schedules/${id}`);
export const logMaintenance = (data) => api.post('/maintenance/logs', data);
