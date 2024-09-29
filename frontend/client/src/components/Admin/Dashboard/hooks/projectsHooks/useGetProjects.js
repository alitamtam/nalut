import { useQuery } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await api.get(`/api/projects`);

      return projects.data;
    },
  });
};
