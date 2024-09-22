// path: client/src/hooks/useDeleteUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/users/${id}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]); // Invalidate the users query to refresh the user list after deletion
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
};
