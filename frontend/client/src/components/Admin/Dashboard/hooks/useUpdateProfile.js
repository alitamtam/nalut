// src/hooks/useUpdateProfile.js
import { useMutation } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { toast } from "react-toastify";

// Function to update profile
const updateProfile = async ({ userId, bio, image }) => {
  const response = await api.patch(`/api/profiles/${userId}`, {
    bio,
    image,
  });
  return response.data;
};

// Custom hook
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });
};
