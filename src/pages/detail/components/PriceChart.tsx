import { Chart } from "react-chartjs-2";
import { Divider, Flex, Radio, TooltipProps } from "antd";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { fetchCoinByHistory } from "../../../utils/service/api";
import { useQuery } from "@tanstack/react-query";
import { format, fromUnixTime } from 'date-fns';
import { TooltipCallbacks, TooltipItem } from "chart.js";

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
  const chartRef = useRef();
  const [isVisibleLine, setIsVisibleLine] = useState(false);
  const [tooltip, setTooltip] = useState({
    label: "",
    price: "",
  })
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinPriceChart", uuid, timePeriod],
    queryFn: () => fetchCoinByHistory(uuid as string, timePeriod as string),
    enabled: !!uuid && !!timePeriod,
    staleTime: 10000,
    refetchInterval: 10000,
  });

  const onHover = useCallback((context) => {
    if(context){
      setIsVisibleLine(true)
      setTooltip({
        label: context.tooltip.dataPoints[0].label,
        price: String(context.tooltip.dataPoints[0].raw),
      })
    }
  },[]);



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
        ref={chartRef}
        type="line"
        data={{
          labels: labels,
          datasets: [
            {
              data: data.map((item) => item.price),
              fill: true,
              borderColor: "#002358",
              backgroundColor: "#D6E6FF",
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
              enabled: false,
              external: function (context) {
                onHover(context)
              }
            },
            annotation: {
              annotations: {
                annotation: {
                  type: 'line',
                  borderColor: 'black',
                  borderWidth: 1,
                  display: isVisibleLine,
                  label: {
                    display: true,
                    content: tooltip.price,
                    position: 'start',
                  },
                  scaleID: 'x',
                  value: tooltip.label
                }
              }
            }
          },
          scales: {
            x: {
              reverse: true,
            },
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
