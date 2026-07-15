import { apiClient } from "./api";

const CONTROLLER_URL = '/users/'

export const userService = {
  myPayments:  () =>  apiClient.get(`${CONTROLLER_URL}my-payments`),
  getProfile:  () =>  apiClient.get(`${CONTROLLER_URL}me`),
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
  sendPay: (data) => apiClient.post(`${CONTROLLER_URL}/details`,{
    "bank": data.bank,
    "phone": data.phone,
    "amount": data.amount,
    "image": data.image,
    // "refence": data.phone
  }),
  editProfile: (data) => {
    return apiClient.put(`${CONTROLLER_URL}${data.id}`,{
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
