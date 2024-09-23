import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetEventById = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await api.get(`/api/events/events/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
