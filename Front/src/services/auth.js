import { apiClient } from "./api";

export const authService ={
  login: (id, password) => apiClient.post('auth/login', {
    'cedula': id,
    "password": password
  })
} 
