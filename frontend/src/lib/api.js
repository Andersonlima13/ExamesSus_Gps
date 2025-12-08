import axios from "axios";

const api = axios.create({
  baseURL: "https://examessus-gps.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
