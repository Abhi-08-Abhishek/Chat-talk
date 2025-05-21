import axios from "axios";

// if it is development then "http://localhost:2000/api" otherwise whatever url with /api
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3000/api" : '/api'

// instence of axios
export const axiosInstance = axios.create({
// valify the backend when we in development mode then use url either in production then user /api
  baseURL: BASE_URL,
  withCredentials: true,  // credential is true to share cookies

});

