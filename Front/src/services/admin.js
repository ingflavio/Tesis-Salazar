import { apiClient } from "./api";

const CONTROLLER_URL = '/admin/'

const formatUser = (user) => {
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
  getPayments: () => apiClient.get(`${CONTROLLER_URL}/payments`),
} 
