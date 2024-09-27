import { useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useGetProjects = () => {
  return useQueryClient("projects", async () => {
    const { data } = await api.get("/api/projects");
    return data;
  });
};
