import axios from "axios";

const axiosClient = axios.create({
  //baseURL: "http://207.148.78.192:8080/api",
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";

  return config;
});

export default axiosClient;
