import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetPublications = (id) => {
  return useQuery({
    queryKey: ["publications", id],
    queryFn: async () => {
      const response = await api.get(`/api/publications/${id}`);
      console.log("Response: ", response.data); // Log the response data
      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
