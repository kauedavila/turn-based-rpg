import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const fetchData = async (classId: string) => {
  const response = axios.get(`${API_URL}/sprites/classes/${classId}`);
  return response;
};

export default function useClassSprites(classId: string) {
  const query = useQuery({
    queryFn: () => fetchData(classId),
    queryKey: ["class-sprites", classId],
    enabled: !!classId,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
