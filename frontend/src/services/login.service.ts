import apiClient from './api.service';

/**
 * Login Service
 * 
 * ASSIGNMENT INSTRUCTIONS FOR STUDENTS:
 * =====================================
 * 
 * This service handles authentication-related API calls.
 * 
 * 1. Implement the login function:
 *    - Make POST request to /auth/login
 *    - Store the returned token
 *    - Store user information
 *    - Handle errors appropriately
 * 
 * 2. Implement additional functions:
 *    - logout() - Clear stored credentials
 *    - isAuthenticated() - Check if user is logged in
 *    - getCurrentUser() - Get current user info
 * 
 * 3. Token management:
 *    - Store in localStorage or sessionStorage
 *    - Handle token expiration
 * 
 * BONUS CHALLENGES:
 * - Implement remember me functionality
 * - Add password reset flow
 * - Implement social login (Google, GitHub)
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const loginService = {
  /**
   * Login function
   * 
   * @param credentials - Email and password
   * @returns Promise with token and user data
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // TODO: Students implement this
    // const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    // localStorage.setItem('accessToken', response.data.accessToken);
    // localStorage.setItem('user', JSON.stringify(response.data.user));
    // return response.data;
    
    throw new Error('Login service not implemented. Students should implement this.');
  },

  /**
   * Logout function
   */
  logout: (): void => {
    // TODO: Students implement this
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    // TODO: Students implement this
    // const token = localStorage.getItem('accessToken');
    // return !!token;
    return false;
  },

  /**
   * Get current user
   */
  getCurrentUser: (): any | null => {
    // TODO: Students implement this
    // const userStr = localStorage.getItem('user');
    // return userStr ? JSON.parse(userStr) : null;
    return null;
  },
};
