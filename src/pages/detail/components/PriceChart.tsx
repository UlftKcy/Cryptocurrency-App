import { Chart } from "react-chartjs-2";
import { Divider, Flex, Radio, Spin } from "antd";
import { Fragment, useState } from "react";
import { fetchCoinByHistory } from "../../../utils/service/api";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime } from "date-fns";
import { timePeriods } from "../../../constants/timePeriod";
import { TimePeriodsType } from "../../../types";

export default function PriceChart({ uuid }: { uuid: string }) {
  const [timePeriod, setTimePeriod] = useState(timePeriods[3]);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinPriceChart", uuid, timePeriod],
    queryFn: () =>
      fetchCoinByHistory(uuid as string, timePeriod.period as string),
    enabled: !!uuid && !!timePeriod,
    refetchInterval: 10 * 1000,
  });

  if (isLoading) {
    return <Flex justify="center"><Spin size="large" /></Flex>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return;
  }

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
          labels: data?.map((item) =>
            format(fromUnixTime(Number(item.timestamp)), timePeriod.timeFormat)
          ),
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
