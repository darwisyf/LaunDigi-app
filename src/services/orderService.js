import { errorMessages } from "vue/compiler-sfc";
import api from "./api";

export const createOrder = async () => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrder = async () => {
  try {
    const response = await api.get("/", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
