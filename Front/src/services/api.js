// api.js
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
      condition: user.userDetails.condition,
      solvency: user.userDetails.solvent,
      rol: user.rol.toLowerCase()
    }
  }
  return {
    id: user.cedula,
    name: user.name,
    rol: user.rol.toLowerCase()
  }
} 

export const formatPay = (payment) => {
  return {
    usuarios: payment.userName,
    cedula: payment.cedula,
    phone: payment.phone,
    bank: payment.bank,
    amount: payment.amount,
    date: payment.paymentDate.split(':')[0].replace('T00','').split('-').reverse().join('/'),
    status: payment.status === 'ACCEPTED' 
  }
} 

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
    try {
      const sessionData = localStorage.getItem('session');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        if (session?.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
      }
    } catch (error) {
      // Si hay error al leer localStorage, simplemente no añadir token
      console.warn('Error al leer sesión:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo manejar 401 si hay token (para no interferir con login)
    if (error.response?.status === 401 && localStorage.getItem('session')) {
      localStorage.removeItem('session');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);