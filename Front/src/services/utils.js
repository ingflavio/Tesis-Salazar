import { apiClient } from "./api";

export const utilsService = {
  getBanks: async () => {
    const response = await apiClient.get('/utils/banks')
    console.log(response)
    return response.data
  }
} 
