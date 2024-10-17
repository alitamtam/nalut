import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { toast } from "react-toastify";

// Function to update user details

// Custom hook
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUser"],

    mutationFn: async ({ id, formData }) => {
      const response = await api.put(`/api/users/user/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.formData; // Return response data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["updateUser"]); // Invalidate the query to refresh data
      toast.success("User updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update user.");
    },
  });
};
