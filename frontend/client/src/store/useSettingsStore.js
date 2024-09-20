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

      setTokenAndUser: (token, user) => {
        // Log profile information for debugging
        console.log("Setting token and user:", {
          profile: user.profile, // Logging profile data
        });

        set({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            profile: {
              id: user.profile?.id || "", // Set Profile ID
              bio: user.profile?.bio || "", // Set bio
              image: user.profile?.image || "", // Set image
            },
          },
        });
      },
    }),
    { name: "SettingsStore" } // Name for better identification in DevTools
  )
);
