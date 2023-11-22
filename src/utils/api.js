import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/api/",
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("Token_Key"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
