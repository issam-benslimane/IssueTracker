import axios from "axios";
import { storage } from "./storage";

axios.defaults.baseURL = "http://localhost:8080/api";

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

export default axios;
