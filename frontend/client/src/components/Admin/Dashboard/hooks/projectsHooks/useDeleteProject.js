import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Invalidate query after delete
    },
  });
};
