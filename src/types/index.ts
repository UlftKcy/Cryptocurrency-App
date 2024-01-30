export interface CoinType {
  uuid: string;
  name: string;
  symbol: string;
  price: string;
  iconUrl: string;
  change: string;
  rank: number;
  marketCap: string;
  sparkline: string[];
  color: string;
  description: string;
  allTimeHigh: {
    price: string;
    timestamp: string;
  };
}
export interface CoinHistoryType{
  price:string;
  timestamp: string;
}

export interface SearchSuggestionCoinType{
  iconUrl: string;
  name: string;
  price: string;
  symbol: string;
  uuid: string;
}

export interface TimePeriodsType{
  period: string;
  time: string;
  timeFormat:string;
}