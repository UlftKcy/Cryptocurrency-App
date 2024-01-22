import axios, { AxiosResponse } from "axios";
import { coinrankingAPI } from "./axios";
import { CoinType } from "../../types";
import { handlingError } from "./error";

export async function fetchCoins() {
  try {
    const res: AxiosResponse = await coinrankingAPI.get("/coins");
    const coins: CoinType[] = res.data.data.coins;
    return coins;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handlingError(error);
    } else {
      // Diğer hatalar
      console.error("Bir hata oluştu:", error);
    }
  }
}

export async function fetchCoinDetail(uuid: string, timePeriod: string) {
  try {
    const res: AxiosResponse = await coinrankingAPI.get(`/coin/${uuid}?timePeriod=${timePeriod}`);
    const coin: CoinType = res.data.data.coin;
    return coin;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handlingError(error);
    } else {
      // Diğer hatalar
      console.error("Bir hata oluştu:", error);
    }
  }
}
