import { useQuery } from "@tanstack/react-query";
import { fetchCoinByUuid } from "../utils/service/api";
import { useParams } from "react-router-dom";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
);

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

  return <div>{data?.name}</div>;
}
