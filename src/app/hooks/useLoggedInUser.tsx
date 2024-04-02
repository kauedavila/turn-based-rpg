import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchData = async () => {
  const response = axios.get(`${API_URL}/users/logged`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export default function useLoggedInUser() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["loggedInUser"],
    enabled: !!localStorage.getItem("token"),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
