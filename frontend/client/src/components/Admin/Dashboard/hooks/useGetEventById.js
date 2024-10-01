import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetEventById = (id) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["event", id, i18n.language],
    queryFn: async () => {
      const response = await api.get(
        `/api/events/events/${id}?lang=${i18n.language}`
      );
      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });
};
