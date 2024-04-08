import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const fetchData = async () => {
  const response = axios.get(`${API_URL}/characters`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

const mutateDataById = async (data: any) => {
  const charId = data._id;
  const response = axios.put(`${API_URL}/characters/${charId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
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

export function useCharactersMutation() {
  const query = useMutation({
    mutationFn: mutateDataById,
    mutationKey: ["characters"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
