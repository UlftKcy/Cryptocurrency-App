import { useQuery } from "@tanstack/react-query";
import { fetchCoinByUuid } from "../../utils/service/api";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
} from "chart.js";
import { Card } from "antd";
import { useState } from "react";
import PriceChart from "./components/PriceChart";
import About from "./components/About";

Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const tabListNoTitle = [
  {
    key: "price",
    label: "Price",
  },
  {
    key: "about",
    label: "About",
  },
];

export default function CoinDetail() {
  const { uuid } = useParams();
  const [activeTabKey, setActiveTabKey] = useState<string>("price");

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinDetail", uuid],
    queryFn: () => fetchCoinByUuid(uuid as string),
    enabled: !!uuid,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return;
  }

  return (
    <Card
      style={{ width: "100%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTab1Change}
      hoverable
    >
      {activeTabKey === "price" && <PriceChart {...data} />}
      {activeTabKey === "about" && <About {...data} />}
    </Card>
  );
}
