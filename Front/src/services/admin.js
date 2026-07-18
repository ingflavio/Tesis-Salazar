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
    const payments = await apiClient.get(`${CONTROLLER_URL}payments`)
    return payments.data.map((payment) => formatPay(payment))
  },
  verifyPayments:(id, status) => apiClient.put(`${CONTROLLER_URL}payments/${id}/verify?status=${status}`),
  getAdmins: () => apiClient.get(`${CONTROLLER_URL}admins`),
} 
