import api from '../utils/api';

export const getAllComplaints = () => api.get('/complaints');
export const createComplaint = (data) => api.post('/complaints', data);
export const updateComplaintStatus = (id, status) =>
  api.put(`/complaints/${id}/status`, null, { params: { status } });
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);
