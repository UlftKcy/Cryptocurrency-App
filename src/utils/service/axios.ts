import axios from "axios";

const coinrankingAPI = axios.create({
  baseURL: "https://api.coinranking.com/v2",
});

coinrankingAPI.interceptors.request.use(
  function (config) {
    const token = "coinrankingaa29f7ad7574fbcd982ee925b29d49ac75973a402ce7cae3";
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
