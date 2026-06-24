import { apiClient } from "./api";

export const usersService = {
  getUsers: () => apiClient.get('users'),
  getUser: (id) => apiClient.get(`users/${id}`),
  registerUser: ({ id, username, password, rol }) => apiClient.post(`users/register`,{
    "cedula": id,
    "name": username,
    "password": password,
    "rol": rol
  }),
  addProfile: ({id, name, lastName, email, phone, age, height_Cm, init_weight_kg, condition }) => apiClient.post(`users/${id}/details`,{
    "firstName": name,
    "lastName": lastName,
    "email": email,
    "phone": phone,
    "age": age,
    "height_Cm": height_Cm,
    "init_weight_kg": init_weight_kg,
    "condition":  condition
  })

} 
