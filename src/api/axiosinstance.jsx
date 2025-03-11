

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        
        const refreshResponse = await axiosInstance.post("/users/refreshtoken");
        const newAccessToken = refreshResponse.data.accessToken;

        console.log("New Access Token:", newAccessToken);

      
        // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        if (refreshError.response?.status === 401) {
          window.location.href = "/login"; 
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
