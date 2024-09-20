import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useEditProfiles = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editProfiles"],

    mutationFn: async ({ id, formData }) => {
      const response = await api.put(`/api/profiles/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data; // Return response data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]); // Invalidate the query to refresh data
    },
  });
};
