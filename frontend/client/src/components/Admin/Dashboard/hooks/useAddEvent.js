// path client/src/components/Admin/Dashboard/hooks/useAddTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addEvents"],
    mutationFn: async (data) => {
      const response = await api.post(`/api/events/events`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
