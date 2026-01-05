import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const token = authUser?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling
    if (error.response?.status === 401) {
      console.warn("Unauthorized – redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
