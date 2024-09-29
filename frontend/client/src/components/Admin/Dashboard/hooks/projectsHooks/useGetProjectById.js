import { useQuery } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useGetProjectById = (id) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const projects = await api.get(`/api/projects/${id}`);
      return projects.data;
    },
  });
};
