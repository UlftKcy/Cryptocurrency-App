import { useQuery } from "@tanstack/react-query";
import { fetchCoinDetail } from "../../utils/service/api";
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
  const [timePeriod,setTimePeriod] = useState("24h");

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinDetail", uuid,timePeriod],
    queryFn: () => fetchCoinDetail(uuid as string ,timePeriod as string),
    enabled: !!uuid && !! timePeriod,
  });


  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log(error)
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
      {activeTabKey === "price" && <PriceChart data={data} timePeriod={timePeriod} setTimePeriod={setTimePeriod}/>}
      {activeTabKey === "about" && <About {...data} />}
    </Card>
  );
}
