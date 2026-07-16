import { apiClient } from "./api";

// auth.js
export const authService = {
  login: async (id, password) => {
    try {
      const response = await apiClient.post('auth/login', {
        cedula: id,
        password: password
      });
      if ('data' in response){
      return {
        id: response.data.cedula,
        rol: response.data.rol.toLowerCase(),
        token: response.data.token
      }
    }
    return response.console.error
      
    } catch (error) {
      console.log('Error capturado:', error);
    }
  }
}  