import api from '../utils/api';

export const getAllAssets = () => api.get('/assets');
export const getAssetById = (id) => api.get(`/assets/${id}`);
export const createAsset = (data) => api.post('/assets', data);
export const updateAsset = (id, data) => api.put(`/assets/${id}`, data);
export const deleteAsset = (id) => api.delete(`/assets/${id}`);
export const updateAssetStatus = (id, status) =>
  api.patch(`/assets/${id}/status`, null, { params: { status } });
