// path client/src/components/Admin/Dashboard/hooks/useDeleteTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProjects"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/projects/${id}`);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Projects"]);
    },
  });
};
