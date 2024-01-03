import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../utils/service/api";
import CoinTable from "../components/CoinTable";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <CoinTable data={data} />;
}
