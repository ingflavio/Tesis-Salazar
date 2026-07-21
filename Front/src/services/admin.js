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
  addProfile: async (data) => apiClient.post(`${CONTROLLER_URL}users/${data.id}/details`,{
    "name": data.name + ' ' + data.lastName,
    "rol": "User",
    "firstName": data.name,
    "lastName": data.lastName,
    "email": data.email,
    "phone": data.phone,
    "age": data.age,
    "height_Cm": data.height,
    "init_weight_kg": data.weight,
    "condition": data.condition,
    "sex": data.sex,
    "bodyFatPercentage": data.fat
  }),
  editProfile:(data) => apiClient.put(`${CONTROLLER_URL}users/${data.id}`,{
    "name": data.name + ' ' + data.lastName,
    "rol": "User",
    "firstName": data.name,
    "lastName": data.lastName,
    "email": data.email,
    "phone": data.phone,
    "age": data.age,
    "height_Cm": data.height,
    "last_weight_kg": data.weight,
    "condition": data.condition,
    "sex": data.sex,
    "bodyFatPercentage": data.fat
  }),
  verifyPayments:(id, status) => apiClient.put(`${CONTROLLER_URL}payments/${id}/verify?status=${status}`),
  getAdmins: () => apiClient.get(`${CONTROLLER_URL}admins`),
} 
