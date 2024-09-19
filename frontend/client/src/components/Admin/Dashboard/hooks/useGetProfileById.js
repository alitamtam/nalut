import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useProfile = (id) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await api.get(`/api/profiles/${id}`);

      return response.data;
    },
    enabled: !!id, // Ensure query only runs if id is available
  });
};
