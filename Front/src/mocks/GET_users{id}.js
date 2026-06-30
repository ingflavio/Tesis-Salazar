export const users = {
  '24682435':{
    "cedula": 24682435,
    "name": "Raul Garcia",
    "password": "$2a$10$L/ykRI1T2ABLoO3B8NRawurdgVuDrEgb6macS0Dz5pR6vdDm9Se3q",
    "rol": "Admin",
    "userDetails": null
  },
  '25107117':{
    "cedula": 25107117,
    "name": "luis ramirez",
    "password": "$2a$10$eLIqXlDzR4bH2zCdJEJqu.2f2q799RWZGNTC.AtUGP5EvYjDv.Xga",
    "rol": "User",
    "userDetails": {
      "cedula": 25107117,
      "firstName": "luis",
      "lastName": "ramirez",
      "email": "luis@gmail.com",
      "phone": "04244084030",
      "age": 24,
      "height_Cm": 186,
      "init_weight_kg": 76.4,
      "last_weight_kg": 76.4,
      "condition": "ninguna",
      "solvent": true,
      "registration_date": "26/06/2026",
      "expiration_date": "26/07/2026",
      "rol": null
    }
  }
};

const formatUser = (user) => {
  if(user.userDetails){
    return {
      id: user.cedula, 
      name: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      email: user.userDetails.lastName,
      phone: user.userDetails.phone,
      age: user.userDetails.age,
      height: user.userDetails.height_Cm,
      weight: user.userDetails.last_weight_kg,
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

export default function getUser(id) {
  return formatUser(users[id])
}