import { Line } from "react-chartjs-2";
import { CoinType } from "../../../types";
import { Divider, Flex, Radio } from "antd";
import { Children } from "react";

type PriceChartType = {
  data: CoinType;
  timePeriod: string,
  setTimePeriod: (timePeriodItem:string) => void,
};

const timePeriods = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"]

export default function PriceChart(props: PriceChartType) {
  const { data, timePeriod, setTimePeriod } = props;

  return (
    <>
      <Flex vertical gap="middle" align="center">
        <Radio.Group defaultValue={timePeriod} buttonStyle="solid">
          {Children.map(timePeriods, timePeriodItem =>
            <Radio.Button value={timePeriodItem} onChange={()=>setTimePeriod(timePeriodItem)} checked={timePeriod === timePeriodItem}>{timePeriodItem}</Radio.Button>
          )}
        </Radio.Group>
      </Flex>
      <Divider />
      <Line
        data={{
          labels: data?.sparkline.map((_, key) => key),
          datasets: [
            {
              /* label: data?.name, */
              data: data?.sparkline.map((item) => item),
              fill: true,
              borderColor: data?.color,
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
