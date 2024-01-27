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
    key: "about",
    label: "About",
  },
  {
    key: "price",
    label: "Price",
  },
];

export default function CoinDetail() {
  const { uuid } = useParams();
  const [activeTabKey, setActiveTabKey] = useState<string>("about");

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };


  return (
    <Card
      style={{ width: "100%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTab1Change}
      hoverable
    >
      {(activeTabKey === "about" && uuid) && <About uuid={uuid} />}
      {(activeTabKey === "price" && uuid) && <PriceChart uuid={uuid} />}
    </Card>
  );
}
