import LSService from "@services/LSService";
import axios from "axios";

const getBaseUrl = () => {
  if (process.env.MODE === "production") {
    return "/api";
  } else {
    return "https://localhost:7115/api";
  }
}

export const BASE_URL = getBaseUrl();

const $api = axios.create({
  baseURL: BASE_URL
});

$api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${LSService.getToken()}`;
  return config;
});

export default $api;
