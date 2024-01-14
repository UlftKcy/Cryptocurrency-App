import { useQuery } from "@tanstack/react-query";
import { fetchCoinByUuid } from "../utils/service/api";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "antd";

Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function CoinDetail() {
  const { uuid } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinDetail", uuid],
    queryFn: () => fetchCoinByUuid(uuid as string),
    enabled: !!uuid,
  });

  console.log(data)

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Card>
      <Line
        data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
              datasets: [
                {
                  label: data?.name,
                  data: data?.sparkline.map(item=>item),
                },
              ],
              /* backgroundColor: [
                "red",
                "green",
                "pink",
                "orange",
                "yellow",
                "lime",
              ], */
              /* borderColor: "rgb(255, 99, 132)",
              borderWidth: 1, */
            
        }}
      />
    </Card>
  );
}
