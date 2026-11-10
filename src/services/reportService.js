import api from '../utils/api';

export const getDashboardSummary = () => api.get('/reports/summary');
export const getSupplyTrend = (days = 7) => api.get('/reports/supply-trend', { params: { days } });
export const getComplaintStats = () => api.get('/reports/complaint-stats');
