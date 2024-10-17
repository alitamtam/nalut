import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["userById", id], // More descriptive queryKey
    queryFn: async () => {
      {
        const response = await api.get(`/api/users/user/${id}`);

        if (!response.data) {
          throw new Error("user not found");
        }

        return response.data;
      }
    },
  });
};
