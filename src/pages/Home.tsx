import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../utils/service/api";

export default function Home() {
    const {isLoading,isError,data,error} = useQuery({
        queryKey:['coins'],
        queryFn:fetchCoins,
        staleTime:5000
    });

    if(isLoading){
        return <span>Loading...</span>
    }

    if(isError){
        return <span>Error: {error.message}</span>
    }


    return (
        <ul>
        {/* Render your data here */}
        {data?.coins?.map((coin) => (
          <li key={coin.id}>{coin.name}</li>
        ))}
      </ul>
    )
}
