import { axiosInstance } from "../utils/axios";

export const login = async (values) => {
  const response = await axiosInstance.post("/login", values);
  return response.data;
};

export const register = async (values) => {
  const response = await axiosInstance.post("/register", values);
  return response.data;
};
