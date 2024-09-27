import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedProject) => {
      await api.put(`/api/projects/${updatedProject.id}`, updatedProject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );
};
