import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetPublications = (id) => {
  return useQuery({
    queryKey: ["publications", id],
    queryFn: async () => {
      const response = await api.get(`/api/publications/${id}`);

      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
