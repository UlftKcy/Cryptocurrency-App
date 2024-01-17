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
