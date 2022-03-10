import axios from "axios";

const axiosClient = axios.create({
  //baseURL: "http://207.148.78.192:8080/api",
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
