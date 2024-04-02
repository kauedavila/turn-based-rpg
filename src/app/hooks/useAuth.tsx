import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchData = async (data: { email: string; password: string }) => {
  const response = axios.post(`${API_URL}/auth`, data);
  return response;
};

export default function useAuth() {
  const query = useMutation({
    mutationFn: fetchData,
    mutationKey: ["auth"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
