// path   client/src/components/Admin/Dashboard/hooks/useGetTopics.js
import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetTopics = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["topics", i18n.language],
    queryFn: async () => {
      const response = await api.get(`/api/topics?lang=${i18n.language}`);

      return response.data;
    },
  });
};
