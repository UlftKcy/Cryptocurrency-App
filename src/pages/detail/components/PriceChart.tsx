import { Line } from "react-chartjs-2";
import { CoinType } from "../../../types";

export default function PriceChart(data:CoinType){
    return(
        <Line
        data={{
          labels: data?.sparkline.map((_, key) => key + ":00"),
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
              display: false
            }
          }
        }}
      />
    )
}