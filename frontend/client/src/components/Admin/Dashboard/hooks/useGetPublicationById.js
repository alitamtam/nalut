import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetPublications = () => {
  return useQuery({
    queryKey: ["publications"],
    queryFn: async (id) => {
      const response = await api.get(`/api/publications${id}`);

      return response.data;
    },
  });
};
