import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const fetchData = async () => {
  const response = axios.get(`${API_URL}/stages`);
  return response;
};

export default function useStages() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["stages"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
