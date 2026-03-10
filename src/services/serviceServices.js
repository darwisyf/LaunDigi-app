import api from "./api";

export const getService = () => {
  try {
    return api.get("/services");
  } catch (error) {
    throw error;
  }
}