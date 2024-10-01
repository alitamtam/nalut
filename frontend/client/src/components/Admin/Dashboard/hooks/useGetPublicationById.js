import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetPublications = (id) => {
  const { i18n } = useTranslation(); // Get the current language from i18n
  return useQuery({
    queryKey: ["publications", id, i18n.language],
    queryFn: async () => {
      const response = await api.get(
        `/api/publications/${id}?lang=${i18n.language}`
      );
      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
