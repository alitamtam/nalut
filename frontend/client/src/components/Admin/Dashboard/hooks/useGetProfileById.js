import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

// Fetch a profile by ID
export const useGetProfileById = (id) => {
  const { i18n } = useTranslation(); // Get the current language from i18n

  return useQuery({
    queryKey: ["profile", id, i18n.language],
    queryFn: async () => {
      const response = await api.get(
        `/api/profiles/${id}?lang=${i18n.language}`
      );
      return response.data;
    },
    enabled: !!id, // Make sure the query only runs if id is defined
  });
};
