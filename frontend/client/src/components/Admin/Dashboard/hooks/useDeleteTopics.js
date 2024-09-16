// path client/src/components/Admin/Dashboard/hooks/useDeleteTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useDeleteTopics = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTopics"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/topics/topic/${id}`);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Topics"]);
    },
  });
};
