import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useEditPublications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editPublications"],

    mutationFn: async ({ id, formData }) => {
      const response = await api.put(`/api/publications/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["publications"]);
    },
  });
};
