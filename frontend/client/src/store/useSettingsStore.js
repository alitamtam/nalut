import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Zustand store with Redux DevTools enabled
export const useSettingsStore = create(
  devtools(
    (set) => ({
      token: "",
      user: {
        id: "",
        username: "",

        role: "",
        profile: {
          id: "",
          bio: "",
          image: "",
        },
      },
      setTokenAndUser: (token, user) => {
        set({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,

            profile: {
              id: user.Profile?.id || "",
              bio: user.Profile?.bio || "",
              image: user.Profile?.image || "",
            },
          },
        });
      },
    }),

    { name: "SettingsStore" }
  )
);
