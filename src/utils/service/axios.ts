import axios from "axios";

export const coinrankingAPI = axios.create({
  baseURL: "https://api.coinranking.com/v2",
});

coinrankingAPI.interceptors.request.use(
  function (config) {
    const token = import.meta.env.ACCESS_TOKEN;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

coinrankingAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
