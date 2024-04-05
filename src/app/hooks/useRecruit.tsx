import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchData = async (data: any) => {
  const response = axios.post(`${API_URL}/characters`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

export default function useRecruit() {
  const query = useMutation({
    mutationFn: fetchData,
    mutationKey: ["recruit"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
