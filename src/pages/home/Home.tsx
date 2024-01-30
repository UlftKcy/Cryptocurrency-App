import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../../utils/service/api";
import CoinTable from "./components/CoinTable";
import { useAppSelector } from "../../hooks/redux";
import { Tabs } from "antd";
import HomeLoading from "./components/HomeLoading";

export default function Home() {
  const favoriteCoins = useAppSelector(state => state.coins.favoriteCoins);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    refetchInterval: 10 * 1000,
  });

  if (isLoading) {
    return <HomeLoading/>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Tabs defaultActiveKey="1" items={[
      {
        key: '1',
        label: 'All',
        children: <CoinTable data={data} />
      },
      {
        key: '2',
        label: 'Favorites',
        children: <CoinTable data={favoriteCoins} />
      },
    ]} />
  )
}
