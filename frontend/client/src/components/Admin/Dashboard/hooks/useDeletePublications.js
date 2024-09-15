import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useDeletePublications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePublications"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/publications/${id}`);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["publications"]);
    },
  });
};
