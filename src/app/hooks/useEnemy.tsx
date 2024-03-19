import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const fetchData = async (_id: string) => {
  const response = axios.get(`${API_URL}/enemies/${_id}`);
  return response;
};

export default function useEnemy(_id: string) {
  const query = useQuery({
    queryFn: () => fetchData(_id),
    queryKey: ["enemies", _id],
    enabled: !!_id,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
