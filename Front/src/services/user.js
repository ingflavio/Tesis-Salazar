import { apiClient, formatUser, formatPay } from "./api";

const CONTROLLER_URL = '/users/'

export const userService = {
  myPayments:  async () =>  {
    const response = await apiClient.get(`${CONTROLLER_URL}my-payments`)
    return response.data.map((payment) => formatPay(payment))
  },
  getProfile:  async () =>  {
    const response = await apiClient.get(`${CONTROLLER_URL}me`)
    const user = response.data
    return formatUser(user)
  },
  addProfile: (data) => apiClient.post(`${CONTROLLER_URL}${data.id}/details`,{
    "firstName": data.name,
    "lastName": data.lastName,
    "email": data.email,
    "phone": data.phone,
    "age": data.age,
    "height_Cm": data.height,
    "init_weight_kg": data.weight,
    "condition":  data.condition,
    "rol": data.rol
  }),
  registerUser: ({ id, username, password, rol }) => apiClient.post(`${CONTROLLER_URL}register`,{
    "cedula": id,
    "name": username,
    "password": password,
    "rol": rol[0].toUpperCase() + rol.slice(1) 
  }),
  sendPay: (data) => 
    apiClient.post(`${CONTROLLER_URL}pay`,{
    "bank": data.bank,
    "phone": data.phone,
    "Reference_number": data.reference_number,
    "amount": data.amount,
    "image": '123'
  }),
  editProfile: (data) => {
    return apiClient.put(`${CONTROLLER_URL}details`,{
      "firstName": data.name,
      "lastName": data.lastName,
      "email": data.email,
      "phone": data.phone,
      "age": data.age,
      "height_Cm": data.height,
      "last_weight_kg": data.weight,
      "condition": data.condition,
      "sex": data.sex.toUpperCase(),
      "bodyFatPercentage": data.fat
    })
  }
} 
