import { useMutation } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useSettingsStore } from "../../../../store/useSettingsStore";

export const useLogin = () => {
  const { setTokenAndUser } = useSettingsStore();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (loginData) => {
      const response = await api.post("/api/users/login", loginData);

      const { token } = response.data;
      localStorage.setItem("token", token);
      setTokenAndUser(token, response.data.user);
      return response.data;
    },
  });
};
