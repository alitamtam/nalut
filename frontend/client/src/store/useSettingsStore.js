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
      },

      setTokenAndUser: (token, user) =>
        set({
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          },
        }),
    }),
    { name: "SettingsStore" }
  ) // You can give your store a name for better identification in DevTools
);
