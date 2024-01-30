import { Descriptions } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinByUuid } from "../../../utils/service/api";

export default function About({ uuid }: { uuid: string }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinAbout", uuid],
    queryFn: () => fetchCoinByUuid(uuid as string),
    enabled: !!uuid,
    staleTime: 6 * 50 * 1000
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
  return <Descriptions title={data.name} bordered column={1} items={items} />;
}
