import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetPublications = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["publications", i18n.language],
    queryFn: async () => {
      const response = await api.get(`/api/publications?lang=${i18n.language}`);

      return response.data;
    },
  });
};
