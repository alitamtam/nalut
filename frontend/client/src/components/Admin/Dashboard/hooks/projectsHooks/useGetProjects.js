import { useQuery } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";
import { useTranslation } from "react-i18next";

export const useGetProjects = () => {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await api.get(`/api/projects?lang=${i18n.language}`);

      return projects.data;
    },
  });
};
