import axios from 'axios';
import { API_URL } from '../utils/constants';

const API_BASE_URL = API_URL || 'http://localhost:8080/api/';

export const formatUser = (user) => {
  if(user.userDetails){
    return {
      id: user.cedula, 
      name: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      email: user.userDetails.email,
      phone: user.userDetails.phone,
      age: user.userDetails.age,
      sex: user.userDetails.sex.toLowerCase(),
      height: user.userDetails.height_Cm,
      weight: user.userDetails.last_weight_kg,
      fat:user.userDetails.bodyFatPercentage,
      // first_weight: user.userDetails.init_weight_kg,
      condition: user.userDetails.condition,
      solvency: user.userDetails.solvent,
      // registration_date: user.userDetails.registration_date,
      // expiration_date: user.userDetails.expiration_date,
      rol: user.rol.toLowerCase()
    }
  }
  return {
    id: user.cedula,
    name: user.name,
    rol: user.rol.toLowerCase()
  }
} 

// Instancia de axios con configuraciones globales
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('session')).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login o refrescar token
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);