import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetProfileById = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await api.get(`/api/profiles/${id}`);

      return response.data;
    },
    enabled: !!id, // This makes sure the query only runs if userId is defined
  });
};
