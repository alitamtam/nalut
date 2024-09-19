import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Create the Zustand store with Redux DevTools enabled
export const useSettingsStore = create(
  devtools(
    (set) => ({
      token: "",
      user: {
        id: "",
        username: "",
        role: "",
        profile: {
          id: "", // Ensure Profile object exists
          bio: "",
          image: "",
        },
      },

      setTokenAndUser: (token, user) =>
        set({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            profile: {
              id: user.Profile?.id || "", // Set Profile ID
              bio: user.Profile?.bio || "", // Set bio
              image: user.Profile?.image || "", // Set image
            },
          },
        }),
    }),
    { name: "SettingsStore" }
  ) // You can give your store a name for better identification in DevTools
);
