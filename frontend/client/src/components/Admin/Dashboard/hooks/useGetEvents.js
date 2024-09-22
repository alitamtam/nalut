import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get(`/api/events`);

      return response.data;
    },
  });
};
