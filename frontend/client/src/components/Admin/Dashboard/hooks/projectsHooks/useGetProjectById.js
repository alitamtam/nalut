import { useQuery } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetProjectById = (id) => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["projects", id, i18n.language],
    queryFn: async () => {
      const projects = await api.get(
        `/api/projects/${id}?lang=${i18n.language}`
      );
      return projects.data;
    },
  });
};
