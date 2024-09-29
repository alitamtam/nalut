import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/api/projects", data, {
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
