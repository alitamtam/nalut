// src/store/settingsStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../api/axiosConfig";

export const useProfileStore = create(
  devtools(
    (set, get) => ({
      token: "",
      user: {
        id: "",
        username: "",
        role: "",
        bio: "",
        image: "",
        fullName: "",
      },

      setTokenAndUser: (token, user) =>
        set({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            bio: user.bio,
            image: user.image,
            fullName: user.fullName,
          },
        }),

      updateProfile: async (bio, image) => {
        const { token, user } = get(); // Get current state
        if (!token || !user.id) {
          throw new Error("User not authenticated or user ID is missing");
        }

        try {
          const response = await api.patch(
            `/api/profiles/${user.id}`,
            { bio, image },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API response:", response.data); // Check API response

          set({
            user: {
              ...user,
              bio: response.data.bio,
              image: response.data.image,
            },
          });
          return response.data;
        } catch (error) {
          throw new Error(`Failed to update profile: ${error.message}`);
        }
      },
    }),
    { name: "SettingsStore" }
  )
);
