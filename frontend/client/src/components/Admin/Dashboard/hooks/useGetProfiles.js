import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useAllProfiles = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["profiles", i18n.language],
    queryFn: async () => {
      const response = await api.get(`/api/profiles?lang=${i18n.language}`);
      console.log("API Response:", response.data); // Log response data

      return response.data;
    },
  });
};
