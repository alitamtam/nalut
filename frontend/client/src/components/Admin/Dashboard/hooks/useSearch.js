// src/hooks/useSearch.js
import { useMutation } from "@tanstack/react-query";
import api from "../../../../api/axiosConfig"; // Ensure this is correctly pointing to your axios setup

// Function to call the search API
const searchAPI = async (term) => {
  const response = await api.get(`api/search/?term=${term}`);
  return response.data;
};

// Hook to use the search mutation
const useSearch = () => {
  return useMutation({
    mutationFn: searchAPI, // Ensure mutationFn is correctly specified
  });
};

export default useSearch;
