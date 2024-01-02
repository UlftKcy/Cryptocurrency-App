import axios, { AxiosResponse } from "axios";
import { coinrankingAPI } from "./axios";


export async function fetchCoins() {
  try {
    const res: AxiosResponse = await axios.get(`${coinrankingAPI}/coins`);

    const data = res.data;

    return data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
        // Axios hatası
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request:", error.request);
        } else {
          console.log("Error message:", error.message);
        }
        console.log("Config:", error.config);
      } else {
        // Diğer hatalar
        console.error("Bir hata oluştu:", error);
      }
  }
}
