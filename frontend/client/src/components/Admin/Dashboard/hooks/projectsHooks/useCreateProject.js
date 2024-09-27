import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newProject) => {
      const response = await api.post("/api/projects", newProject, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
    }
  );
};
