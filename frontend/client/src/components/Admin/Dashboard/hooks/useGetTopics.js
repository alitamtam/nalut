// path   client/src/components/Admin/Dashboard/hooks/useGetTopics.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await api.get("/api/topics");

      return response.data;
    },
  });
};
