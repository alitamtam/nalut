import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetEventById = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await api.get(`/api/events/events/${id}`);
      console.log(response.data);

      return response.data;
    },
    enabled: !!id, // Ensure query only runs if id is available
  });
};
