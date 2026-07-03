const capitalize = (value) => value[0].toUpperCase() + value.slice(1)

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
    parseValue: (value) => value.toLowerCase(),
    formatValue: capitalize
  },
  lastName: {
    name: 'lastName',
    label: 'apellido',
    type: 'text',  
    placeholder: '',  
    parseValue: (value) => value.toLowerCase(),
    formatValue: capitalize
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
  phone: {
    name: 'phone',
    label: 'telefono',
    type: 'text',  
    placeholder: '',  
  },
  email: {
    name: 'email',
    label: 'E-mail',
    type: 'text',  
    placeholder: '',  
  },
  sex: {
    name: 'sex',
    label: 'sexo',
    type: 'enum',       
    placeholder: '', 
    parseValue: (value) => value.toUpperCase(),
    formatValue: (value) => value.toLowerCase(),
    options: [{ label: 'femenino', value: 'f' }, { label: 'masculino', value: 'm' }],
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
  fat: {
    name: 'fat',
    label: 'Porcentaje de grasa',
    type: 'text',  
    parseValue: (value) => Number(value.replace('%','')),
    formatValue: (value) => String(value) + '%'
  },
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