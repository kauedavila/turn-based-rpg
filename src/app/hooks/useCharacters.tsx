import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const fetchData = async () => {
  const response = axios.get(`${API_URL}/characters`);
  return response;
};

export default function useCharacters() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["characters"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
