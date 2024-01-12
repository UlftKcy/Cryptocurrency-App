import { useQuery } from "@tanstack/react-query";
import { fetchCoinByUuid } from "../utils/service/api";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';
import { CategoryScale, Legend, LinearScale, Title, Tooltip,PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
const labels = ["January", "February", "March", "April", "May", "June"];

const dataChart = {
  label:labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 30, 50, 20, 25, 44],
      backgroundColor: ['red', 'green', 'pink', 'orange', 'yellow', 'lime'],
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
    }
  ]
};

export default function CoinDetail() {
  const { uuid } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["coinDetail", uuid],
    queryFn: ()=>fetchCoinByUuid(uuid as string),
    enabled: !!uuid,
  });


  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Line data={dataChart}/>
  );
}
