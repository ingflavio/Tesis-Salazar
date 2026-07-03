import { apiClient } from "./api";

export const authService = {
  login: async (id, password) => {
    const response = await apiClient.post('auth/login', {
      'cedula': id,
      "password": password
    })
    if ('data' in response){
      return {
        id: response.data.cedula,
        rol: response.data.rol.toLowerCase(),
        token: response.data.token
      }
    }
    return response.console.error
    
  }
} 
