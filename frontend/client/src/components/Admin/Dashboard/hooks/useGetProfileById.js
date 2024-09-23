import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetProfileById = (userId) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await api.get(`/api/profile/${userId}`);

      return response.data;
    },
    enabled: !!userId, // This makes sure the query only runs if userId is defined
  });
};
