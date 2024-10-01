import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetEvents = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["events", i18n.language],
    queryFn: async () => {
      const response = await api.get(
        `/api/events/events?lang=${i18n.language}`
      );

      return response.data;
    },
  });
};
