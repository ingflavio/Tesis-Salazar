import { apiClient } from "./api";

export const utilsService = {
  getBanks: () => apiClient.get('/utils/banks')
} 
