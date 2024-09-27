import { useQueryClient } from "@tanstack/react-query";
import api from "../../../../../api/axiosConfig";

export const useGetProjectById = (id) => {
  return useQueryClient(["project", id], async () => {
    const { data } = await api.get(`/api/projects/${id}`);
    return data;
  });
};
