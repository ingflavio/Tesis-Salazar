import { apiClient } from "./api";

export const utilsService = {
  getBanks: async () => {
    const response = await apiClient.get('/utils/banks')
    return response.data
  }
} 
