import { Chart } from "react-chartjs-2";
import { Divider, Flex, Radio } from "antd";
import { Children, useState } from "react";
import { fetchCoinByHistory } from "../../../utils/service/api";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime } from 'date-fns';

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
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return;
  }

  const labels = data?.map((item) => format(fromUnixTime(Number(item.timestamp)), "HH:mm"));


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
      <Chart
        type="line"
        data={{
          /*  labels: labels, */
          datasets: [
            {
              data: data.map((item) => item.price),
              borderColor: "#F0B90B",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
            },
          },
          scales: {
            x: {
              reverse: true,
              type: "category",
              labels: labels,
              stack: "center",
              ticks: {
                font: {
                  size: 10
                },
              },
            },
            y:{
              ticks:{
                callback:(value)=>{
                  return Number(value)/1000 + 'K'
                }
              }
            }
          },
          interaction: {
            mode: "nearest",
            axis: 'xy',
          },
        }}
      />
    </>
  );
}
