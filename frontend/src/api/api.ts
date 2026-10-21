import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue: {
  resolve: () => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

  
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

 
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

  
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: () => resolve(api(originalRequest)),
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
    
      await api.post("/auth/refresh", {}, {withCredentials:true });

     
      processQueue();

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      window.location.href = "/";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;