import { apiClient } from "./api";

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

export const usersService = {
  getUsers: async () => {
    const response = await apiClient.get('users')
    return response.data.map(formatUser)
  },
  getUser: async (id) => {
    const response = await apiClient.get(`users/${id}`)
    const user = await response.data
    return formatUser(user)
  },
  registerUser: ({ id, username, password, rol }) => apiClient.post(`users/register`,{
    "cedula": id,
    "name": username,
    "password": password,
    "rol": rol[0].toUpperCase() + rol.slice(1) 
  }),
  addProfile: (data) => apiClient.post(`users/${data.id}/details`,{
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
  editProfile: (data) => {
    return apiClient.put(`users/${data.id}`,{
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
