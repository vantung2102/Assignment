import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://13.250.111.54:3000/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default apiClient;
