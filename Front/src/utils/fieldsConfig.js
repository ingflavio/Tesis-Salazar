export const fieldsConfig = {
  id: {
    name: 'id',
    label: 'cedula',
    type: 'text',
    placeholder: '',   
    parseValue: (value) => Number(value) 
  },
  name: {
    name: 'name',
    label: 'nombre',
    type: 'text', 
    placeholder: '',      
    parseValue: (value) => value.toLowerCase()
  },
  lastName: {
    name: 'lastName',
    label: 'apellido',
    type: 'text',  
    placeholder: '',  
    parseValue: (value) => value.toLowerCase()
  },
  password: {
    name: 'password',
    label: 'contraseña',
    type: 'text',  
    placeholder: '',  
  },
  age: {
    name: 'age',
    label: 'edad',
    type: 'text', 
    placeholder: '',
    parseValue: (value) => Number(value)
  },
  // sex: {
  //   name: 'sex',
  //   label: 'sexo',
  //   type: 'boolean',       
  //   placeholder: '', 
  //   formatValue: (value) => value ? 'femenino' : 'masculino',
  //   options: [{ label: 'femenino', value: 'f' }, { label: 'masculino', value: 'm' }],
  // },
  phone: {
    name: 'phone',
    label: 'telefono',
    type: 'text',  
    placeholder: '',  
  },
  email: {
    name: 'email',
    label: 'correo electronico',
    type: 'text',  
    placeholder: '',  
  },
  height: {
    name: 'height',
    label: 'altura',
    type: 'text',       
    placeholder: '',
    parseValue: (value) => Number(value.replace(',','')),
    formatValue: (value) => `${String(value)[0]},${String(value).slice(1)}` 
  },
  weight: {
    name: 'weight',
    label: 'peso',
    type: 'text', 
    placeholder: '',
    parseValue: (value) => Number(value.replace(',','.')),
    formatValue: (value) => String(value).replace('.',',')
  },
  // fat: {
  //   name: 'fat',
  //   label: 'Porcentaje de grasa',
  //   type: 'number',  
  //   placeholder: '',
  //   min: 18,
  //   max: 80     
  // },
  condition: {
    name: 'condition',
    label: 'condición',
    type: 'text',  
    placeholder: '',  
  },
  solvency: {
    name: 'solvency',
    label: 'Solvencia',
    type: 'boolean',       
    options: [{ label: 'Solvente', value: true }, { label: 'Insolvente', value: false }],
  },
}

export const configArray = Object.entries(fieldsConfig).map(([,value]) => value)