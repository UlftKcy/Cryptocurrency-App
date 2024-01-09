import { AxiosError } from "axios";

export function handlingError(error: AxiosError) {
    // Axios hatası
    if (error.response) {
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("Request:", error.request);
    } else {
      console.log("Error message:", error.message);
    }
    console.log("Config:", error.config);
  }