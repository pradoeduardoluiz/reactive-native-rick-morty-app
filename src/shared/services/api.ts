/**
 * Axios API Client for Rick and Morty API
 * Base URL: https://rickandmortyapi.com/api
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';
const API_TIMEOUT = 10000; // 10 seconds

/**
 * Axios instance configured for Rick and Morty API
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for logging (development only)
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (__DEV__) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('❌ API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for logging (development only)
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (__DEV__) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Enhanced error message for better debugging
    if (error.response) {
      // Server responded with error status
      const errorMessage = `API Error: ${error.response.status} - ${error.config?.url}`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('Network Error: No response from server'));
    } else {
      // Error in request configuration
      return Promise.reject(new Error(`Request Error: ${error.message}`));
    }
  }
);

export default api;
