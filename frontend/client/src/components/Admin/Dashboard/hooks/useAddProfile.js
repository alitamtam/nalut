// path client/src/components/Admin/Dashboard/hooks/useAddTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useAddProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addProfile"],
    mutationFn: async (data) => {
      const response = await api.post(`/api/profiles`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
};
