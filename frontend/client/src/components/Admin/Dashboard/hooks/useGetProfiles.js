import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useAllProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const response = await api.get(`/api/profiles`);

      return response.data;
    },
  });
};
