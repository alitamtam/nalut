// path client/src/components/Admin/Dashboard/hooks/useDeleteTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/profiles/${id}`);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
};
