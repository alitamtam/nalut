import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedProject }) => {
      await api.put(`/api/projects/${id}`, updatedProject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Use object form
    },
  });
};
