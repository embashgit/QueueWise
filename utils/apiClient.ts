// src/utils/apiClient.ts
import axios from 'axios';
import Cookies from 'js-cookie';
// Create an instance of axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1', // Set the base URL from environment variable
  timeout: 10000, // Set a timeout limit (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need here
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token or any other request modifications here
    const token = Cookies.get('token'); // Example of getting a token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('API Error:', error.response.data);
      // Handle specific status codes (e.g., 401 unauthorized, 500 server error)
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
