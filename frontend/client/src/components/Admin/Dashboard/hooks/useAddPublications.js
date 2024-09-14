import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useAddPublications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addPublications"],
    mutationFn: async (data) => {
      const response = await api.post(`/api/publications`, data, {
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
