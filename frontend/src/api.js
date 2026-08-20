import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor: Attach JWT token from localStorage on every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API Calls
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);

// Enquiry API Calls
export const fetchEnquiries = (search = '', status = 'All') => 
  API.get(`/enquiries?search=${search}&status=${status}`);

export const createEnquiry = (newEnquiry) => API.post('/enquiries', newEnquiry);
export const updateEnquiry = (id, updatedData) => API.put(`/enquiries/${id}`, updatedData);
export const deleteEnquiry = (id) => API.delete(`/enquiries/${id}`);

// Change user password
export const changePassword = (passwordData) => 
  API.put('/auth/change-password', passwordData);

// Delete own account
export const deleteAccount = () => 
  API.delete('/auth/delete-account');