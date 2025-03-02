import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["editEvent"],

    mutationFn: async ({ id, formData }) => {
      const response = await api.put(`/api/events/events/${id}`, formData, {
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
