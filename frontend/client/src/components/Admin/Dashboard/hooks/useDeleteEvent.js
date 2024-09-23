// path client/src/components/Admin/Dashboard/hooks/useDeleteTopics.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["events"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/events/events/${id}`);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
