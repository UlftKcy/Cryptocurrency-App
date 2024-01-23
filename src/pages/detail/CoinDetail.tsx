import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
/* import {
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
} from "chart.js"; */
import { Card } from "antd";
import { useState } from "react";
import PriceChart from "./components/PriceChart";
import About from "./components/About";
import annotationPlugin from 'chartjs-plugin-annotation';


Chart.register(
  annotationPlugin
 /*  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement */
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


  return (
    <Card
      style={{ width: "100%" }}
      tabList={tabListNoTitle}
      activeTabKey={activeTabKey}
      onTabChange={onTab1Change}
      hoverable
    >
      {(activeTabKey === "price" && uuid) && <PriceChart uuid={uuid} />}
      {(activeTabKey === "about" && uuid) && <About uuid={uuid} />}
    </Card>
  );
}
