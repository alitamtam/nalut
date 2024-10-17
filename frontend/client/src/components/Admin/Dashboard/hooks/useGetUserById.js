import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["userById", id], // More descriptive queryKey
    queryFn: async () => {
      try {
        const response = await api.get(`/api/users/user/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch user data"
        );
      }
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
