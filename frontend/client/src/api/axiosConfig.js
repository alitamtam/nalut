import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Uses the API URL from the environment variables
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add Authorization token from localStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default api;
