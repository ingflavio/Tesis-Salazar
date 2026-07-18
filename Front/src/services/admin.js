import { apiClient, formatUser, formatPay } from "./api";

const CONTROLLER_URL = '/admin/'  

export const adminService = {
  getUsers: async () => {
    const response = await apiClient.get(`${CONTROLLER_URL}users`)
    return response.data.map(formatUser)
  },
  getUser: async (id) => {
    const response = await apiClient.get(`${CONTROLLER_URL}users/${id}`)
    const user = await response.data
    return formatUser(user)
  },
  getPayments: async () => {
    const payments = await apiClient.get(`${CONTROLLER_URL}/payments`)
    return payments.map((payment) => formatPay(payment))
  },
} 
