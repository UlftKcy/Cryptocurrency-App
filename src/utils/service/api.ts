import axios, { AxiosResponse } from "axios";
import { coinrankingAPI } from "./axios";
import { CoinHistoryType, CoinType } from "../../types";
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

export async function fetchCoinByUuid(uuid: string) {
  try {
    const res: AxiosResponse = await coinrankingAPI.get(`/coin/${uuid}`);
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

export async function fetchCoinByHistory(uuid: string, timePeriod: string) {
  try {
    const res: AxiosResponse = await coinrankingAPI.get(`/coin/${uuid}/history?timePeriod=${timePeriod}`);
    const coin: CoinHistoryType[] = res.data?.data.history;
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
