import axios from 'axios';

// 1. Create a custom Axios instance
const api = axios.create({
  // Setting a relative base URL for cleaner endpoint calls in components
  baseURL: 'https://service-app-backend-1.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// A flag to prevent multiple refresh requests from being sent simultaneously
let isRefreshing = false;
let failedQueue = [];

// Function to process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. Request Interceptor: Attach the current Access Token from localStorage
api.interceptors.request.use(
  config => {
    // Directly retrieve accessToken from localStorage
    const accessToken = localStorage.getItem('accessToken'); 

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// 3. Response Interceptor: Handle 401 Unauthorized errors and refresh token
api.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized) and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true;

      // Queue the request if a refresh is already in progress
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      // Start the refresh process
      isRefreshing = true;

      // Directly retrieve refreshToken from localStorage
      const refreshToken = localStorage.getItem('refreshToken'); 

      if (!refreshToken) {
        // No Refresh Token available, user must log in
        isRefreshing = false;
        console.error("No Refresh Token found. Forcing user to log in.");
        // **TO DO: Add logic to clear ALL tokens and redirect user to login page here**
        return Promise.reject(error);
      }
      
      try {
        // --- API CALL TO REFRESH TOKEN (Using default axios to avoid refresh loop) ---
        const refreshResponse = await axios.post(
          'https://service-app-backend-1.onrender.com/api/auth/refresh-token', // **Confirm/Update this refresh endpoint**
          { refreshToken } 
        );
        
        const newAccessToken = refreshResponse?.data?.accessToken;
        // Assuming your backend returns the new Refresh Token here if it's rotating
        const newRefreshToken = refreshResponse?.data?.refreshToken; 
        
        // 4. Update tokens in Local Storage
        localStorage.setItem('accessToken', newAccessToken);

        
        if (newRefreshToken) { 
            localStorage.setItem('refreshToken', newRefreshToken); 
        }
        
        // 5. Update the header of the original request and retry
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // 6. Resolve all queued requests
        isRefreshing = false;
        processQueue(null, newAccessToken);

        return api(originalRequest);

      } catch (refreshError) {
        // Refresh token failed (e.g., refresh token expired)
        isRefreshing = false;
        processQueue(refreshError, null);
        console.error("Refresh Token failed. Forcing logout.");
        // **TO DO: Add logic to clear ALL tokens and redirect user to login page here**
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;