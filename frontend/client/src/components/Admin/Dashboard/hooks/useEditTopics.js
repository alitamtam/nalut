import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useEditTopics = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editTopics"],

    mutationFn: async (id, formData) => {
      const response = await api.put(`/api/topics/topic/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["topics"]);
    },
  });
};
