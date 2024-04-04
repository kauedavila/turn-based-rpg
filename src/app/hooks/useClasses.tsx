import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const fetchData = async () => {
  const response = axios.get(`${API_URL}/classes`);
  return response;
};

export default function useClasses() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["classes"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
