import api from '../utils/api';

export const createLog = (data) => api.post('/monitoring/logs', data);
export const getLogsByAsset = (assetId) => api.get(`/monitoring/logs/asset/${assetId}`);
export const getLogsByDate = (date) => api.get('/monitoring/logs/date', { params: { date } });
export const getAverageSupply = (assetId) =>
  api.get(`/monitoring/logs/asset/${assetId}/average-supply`);
