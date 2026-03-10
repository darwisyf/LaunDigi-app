import api from "./api";

export const createOrder = (data) => {
  try {
    return api.post("/orders", data);
  } catch (error) {
    throw error;
  }
};

export const getOrder = () => {
  try {
    return api.get("/orders");
  } catch (error) {
    throw error;
  }
};
