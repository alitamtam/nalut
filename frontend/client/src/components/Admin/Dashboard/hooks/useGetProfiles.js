import { useQuery } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig";

const fetchProfiles = async () => {
  const response = await api.get("/api/profiles");
  return response.data;
};

export const useGetProfiles = () => {
  return useQuery({ queryKey: ["profile"], queryFn: fetchProfiles });
};
