import { Descriptions } from "antd";
import { CoinType } from "../../../types";

export default function About(data: CoinType) {
  const items = [
    {
      label: "Rank",
      children: data.rank,
    },
    {
      label: "Description",
      children: data.description,
    },
    {
      label: "MarketCap",
      children:
        "$ " + (Number(data.marketCap) / 1000000000).toFixed(2) + " billion",
    },
    {
      label: "AllTimeHigh",
      children: (
        <>
          Price: {`$ ${Number(data.allTimeHigh.price).toFixed(2)}`}
          <br />
          Time:{" "}
          {new Date(
            Number(data.allTimeHigh.timestamp) * 1000
          ).toLocaleDateString()}
        </>
      ),
    },
  ];
  return <Descriptions bordered column={1} items={items} />;
}
