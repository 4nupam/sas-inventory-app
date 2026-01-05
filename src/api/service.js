import axiosInstance from "./axiosInstance";
import { AUTH_ENDPOINTS } from "./endPoints";

export const auth_service = {
  login: (payload) => axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload),
  register: (payload) => axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload),
};

export const product_service = {
  getProducts: () => axiosInstance.get(AUTH_ENDPOINTS.PRODUCTS),
};
