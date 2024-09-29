import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editProject"],

    mutationFn: async ({ id, formData }) => {
      const response = await api.put(`/api/projects/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Use object form
    },
  });
};
