import axios from "axios";
import xhrAdapter from "axios/lib/adapters/xhr.js";

const api = axios.create({
  baseURL: "https://examessus-gps.onrender.com",
  headers: { "Content-Type": "application/json" },
  adapter: xhrAdapter
});

export default api;