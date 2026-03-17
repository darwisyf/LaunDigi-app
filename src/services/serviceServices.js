import api from "./api";

export const getService = () => {
  try {
    return api.get("/services");
  } catch (error) {
    throw error;
  }
};

export const createService = (payload) => {
  try {
    return api.post("/services", payload);
  } catch (error) {
    throw error;
  }
};
