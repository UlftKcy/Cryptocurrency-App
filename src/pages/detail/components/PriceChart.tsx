import { Line } from "react-chartjs-2";
/* import { CoinType } from "../../../types"; */
import { Divider, Flex, Radio } from "antd";
import { Children, useState } from "react";
import { fetchCoinByHistory } from "../../../utils/service/api";
import { useQuery } from "@tanstack/react-query";

const timePeriods = [
  "1h",
  "3h",
  "12h",
  "24h",
  "7d",
  "30d",
  "3m",
  "1y",
  "3y",
  "5y",
];

export default function PriceChart({ uuid }: { uuid: string }) {
  const [timePeriod, setTimePeriod] = useState("24h");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinPriceChart", uuid, timePeriod],
    queryFn: () => fetchCoinByHistory(uuid as string, timePeriod as string),
    enabled: !!uuid && !!timePeriod,
    staleTime: 10000,
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log(error);
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <Flex vertical gap="middle" align="center">
        <Radio.Group defaultValue={timePeriod} buttonStyle="solid">
          {Children.map(timePeriods, (timePeriodItem) => (
            <Radio.Button
              value={timePeriodItem}
              onChange={() => setTimePeriod(timePeriodItem)}
              checked={timePeriod === timePeriodItem}
            >
              {timePeriodItem}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Flex>
      <Divider />
      <Line
        data={{
          labels: data?.map((time) =>
            new Date(Number(time.timestamp) * 1000).toLocaleTimeString()
          ),
          datasets: [
            {
              /* label: data?.name, */
              data: data.map((item) => item.price),
              fill: true,
              borderColor: "#E5E5E5",
              backgroundColor: "#E5E5E5",
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
}
