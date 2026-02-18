import axios from 'axios';

/**
 * API Service Configuration
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This service handles all HTTP requests to the backend.
 * 
 * 1. Configure the axios instance:
 *    - Set base URL from environment variables
 *    - Add request interceptors to attach tokens
 *    - Add response interceptors to handle errors
 * 
 * 2. Implement token management:
 *    - Store token in localStorage or sessionStorage
 *    - Attach token to Authorization header
 *    - Handle token expiration
 * 
 * 3. Error handling:
 *    - Handle network errors
 *    - Handle 401 Unauthorized (redirect to login)
 *    - Handle 403 Forbidden
 * 
 * BONUS CHALLENGES:
 * - Implement request queuing
 * - Add retry logic for failed requests
 * - Implement token refresh mechanism
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Students implement token attachment
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TODO: Students implement error handling
    // if (error.response?.status === 401) {
    //   localStorage.removeItem('accessToken');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
