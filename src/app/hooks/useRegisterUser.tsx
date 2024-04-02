import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchData = async (data: { email: string; password: string }) => {
  const response = axios.post(`${API_URL}/users`, data);
  return response;
};

export default function useRegisterUser() {
  const query = useMutation({
    mutationFn: fetchData,
    mutationKey: ["register-users"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
