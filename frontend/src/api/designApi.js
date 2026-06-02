import api from './axiosInstance';

export const signupApi = (data) => api.post('/auth/signup', data);
export const loginApi = (data) => api.post('/auth/login', data);

export const generateDesignApi = (requirement) =>
  api.post('/design/generate', { requirement });

export const getDesignsApi = () => api.get('/design');
export const getDesignByIdApi = (id) => api.get(`/design/${id}`);
export const updateDesignApi = (id, data) => api.put(`/design/${id}`, data);
export const deleteDesignApi = (id) => api.delete(`/design/${id}`);
