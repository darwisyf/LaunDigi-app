import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
