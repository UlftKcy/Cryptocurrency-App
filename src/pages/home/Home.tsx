import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../../utils/service/api";
import CoinTable from "./components/CoinTable";
import { useAppSelector } from "../../hooks/redux";
import { Tabs } from "antd";

export default function Home() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });
  const favoriteCoins = useAppSelector(state => state.coins.favoriteCoins);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
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
    </>
  )
}
