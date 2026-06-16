const profileColumns = {
  id: "cedula",
  name: "nombre",
  lastName: "apellido",
  age: "edad",
  sex: "sexo",
  phone: "telefono",
  height: "altura",
  weight: "peso",
  fat: "porcentaje de grasa",
  condition: 'condición médica',
  solvency: 'solvencia',
  password: 'contraseña'
};

export const profiles = [
  {
    id: "30123123",
    name: "luis",
    lastName: "hernandez",
    age: 27,
    sex: "m",
    phone: '04244084030',
    height: 1.69,
    weight: 76,
    fat: 30,
    condition: 'ninguna',
    solvency: true,
    password: '1234'
  },
  {
    id: "25197803",
    name: "miguel",
    lastName: "salazar",
    age: 43,
    sex: "m",
    phone: '04244084030',
    height: 1.67,
    weight: 78,
    fat: 30,
    condition: 'ninguna',
    solvency: true,
    password: '1234'
  },
  {
    id: "30123456",
    name: "maria",
    lastName: "gonzales",
    age: 22,
    sex: "f",
    phone: '04244084030',
    height: 1.7,
    weight: 75,
    fat: 30,
    condition: 'ninguna',
    solvency: false,
    password: '1234'
  },
  {
    id: "30215136",
    name: "ana",
    lastName: "ramirez",
    age: 22,
    sex: "f",
    phone: '04244084030',
    height: 1.67,
    weight: 65,
    fat: 20,
    condition: 'ninguna',
    solvency: false,
    password: '1234'
  },
  {
    id: "30951759",
    name: "barbara",
    lastName: "garcia",
    age: 20,
    sex: "f",
    phone: '04244084030',
    height: 1.62,
    weight: 60,
    fat: 20,
    condition: 'ninguna',
    solvency: true,
    password: '1234'
  },
];

export const searchProfiles = () => {
  //fetch
  return profiles
}

export const searchProfile = (id) => {
  //fetch
  return profiles.filter((item) => item.id == id)[0]
}

export const searchProfileColumns = () => {
  //fetch
  return profileColumns;
}