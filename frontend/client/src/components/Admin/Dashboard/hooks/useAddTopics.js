import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useAddTopics = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addTopics"],
    mutationFn: async (data) => {
      const response = await api.post(`/api/Topics`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["Topics"]);
    },
  });
};
