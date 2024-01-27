import { Chart } from "react-chartjs-2";
import { Divider, Flex, Radio } from "antd";
import { Fragment, useState } from "react";
import { fetchCoinByHistory } from "../../../utils/service/api";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime } from "date-fns";

type TimePeriodsType = {
  period: string;
  time: string;
  timeFormat:string;
};

const timePeriods: TimePeriodsType[] = [
  {
    period: "1h",
    time:"hour",
    timeFormat: "HH:mm",
  },
  {
    period: "3h",
    time:"hour",
    timeFormat: "HH:mm",
  },
  {
    period: "12h",
    time:"hour",
    timeFormat: "HH:mm",
  },
  {
    period: "24h",
    time:"hour",
    timeFormat: "HH:mm",
  },
  {
    period: "7d",
    time:"day",
    timeFormat: "LLL d",
  },
  {
    period: "30d",
    time:"day",
    timeFormat: "LLL d",
  },
  {
    period: "3m",
    time: "month",
    timeFormat: "d LLL",
  },
  {
    period: "1y",
    time: "year",
    timeFormat: "d LLL",
  },
  {
    period: "3y",
    time:"year",
    timeFormat: "LLL yy",
  },
  {
    period: "5y",
    time:"year",
    timeFormat: "yyyy",
  },
];

export default function PriceChart({ uuid }: { uuid: string }) {
  const [timePeriod, setTimePeriod] = useState(timePeriods[3]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinPriceChart", uuid, timePeriod],
    queryFn: () =>
      fetchCoinByHistory(uuid as string, timePeriod.period as string),
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

  const labels = data?.map((item) =>
    format(fromUnixTime(Number(item.timestamp)), timePeriod.timeFormat)
  );

  return (
    <Fragment>
      <Flex vertical gap="middle" align="center">
        <Radio.Group defaultValue={timePeriod.period} buttonStyle="solid">
          {timePeriods.map((timePeriodItem: TimePeriodsType, index: number) => {
            return (
              <Radio.Button
                key={index}
                value={timePeriodItem.period}
                onChange={() => setTimePeriod(timePeriodItem)}
                checked={timePeriod.period === timePeriodItem.period}
              >
                {timePeriodItem.period}
              </Radio.Button>
            );
          })}
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
            tooltip: {},
          },
          scales: {
            x: {
              reverse: true,
              type: "category",
              labels: labels,
              stack: "center",
              ticks: {
                font: {
                  size: 10,
                },
              },
            },
            y: {
              ticks: {
                callback: (value) => {
                  return Number(value) / 1000 + "K";
                },
              },
            },
          },
          interaction: {
            mode: "nearest",
            axis: "xy",
          },
        }}
      />
    </Fragment>
  );
}
