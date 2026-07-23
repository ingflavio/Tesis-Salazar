import { validateNotEmpty, validateIncrease, validatePhone, validateEmail, validateNumber } from '../hooks/useValidateForm'

const capitalize = (value) => value[0].toUpperCase() + value.slice(1)

// ParseValue es para acomodarlo cuando lo enviamos al backend
// format es para acomodarlo cuando lo mostramos al usuario

export const fieldsConfig = {
  id: {
    name: 'id',
    label: 'Cedula',
    type: 'text',
    placeholder: '',   
    parseValue: (value) => Number(value),
    validateFunc: (value) => validateNumber({value, name:'La cedula'}) 
  },
  name: {
    name: 'name',
    label: 'Nombre',
    type: 'text', 
    placeholder: '',      
    parseValue: (value) => value.toLowerCase(),
    validateFunc: (value) => validateNotEmpty(value, 'el nombre'),
    formatValue: capitalize
  },
  lastName: {
    name: 'lastName',
    label: 'Apellido',
    type: 'text',  
    placeholder: '',  
    parseValue: (value) => value.toLowerCase(),
    validateFunc: (value) => validateNotEmpty(value, 'el apellido'),
    formatValue: capitalize
  },
  password: {
    name: 'password',
    label: 'contraseña',
    type: 'text',  
    placeholder: '',  
    validateFunc: (value) => validateNotEmpty(value, 'la contraseña'),
  },
  age: {
    name: 'age',
    label: 'Edad',
    type: 'text', 
    placeholder: '',
    parseValue: (value) => Number(value),
    validateFunc: (value) => validateNumber({value, name: 'La edad'}),
    // validateFunc: (value, previousValue) => validateIncrease({value, previousValue, increase: 1}),
  },
  phone: {
    name: 'phone',
    label: 'Telefono',
    type: 'text',  
    placeholder: '',  
    validateFunc: (value, ) => validatePhone(value),
  },
  email: {
    name: 'email',
    label: 'E-mail',
    type: 'text',  
    placeholder: '', 
    validateFunc: (value, ) => validateEmail(value), 
  },
  sex: {
    name: 'sex',
    label: 'Sexo',
    type: 'enum',       
    placeholder: '', 
    parseValue: (value) => value.toUpperCase(),
    formatValue: (value) => value.toLowerCase(),
    validateFunc: (value) =>  (value === 'F' || value === 'M') ? true : 'Debes elije un sexo', 
    options: [{ label: '', value: null },{ label: 'femenino', value: 'f' }, { label: 'masculino', value: 'm' }],
  },
  height: {
    name: 'height',
    label: 'Altura',
    type: 'text',       
    placeholder: '',
    parseValue: (value) => Number(value.replace(',','')),
    formatValue: (value) => `${String(value)[0]},${String(value).slice(1)}`,
    validateFunc: (value) => validateNumber({value, name: 'La altura'}), 
  },
  weight: {
    name: 'weight',
    label: 'Peso',
    type: 'text', 
    placeholder: '',
    parseValue: (value) => Number(value.replace(',','.')),
    formatValue: (value) => String(value).replace('.',','),
    validateFunc: (value) => validateNumber({value, name: 'El peso'}), 
  },
  fat: {
    name: 'fat',
    label: 'Porcentaje de grasa',
    type: 'text',  
    parseValue: (value) => Number(value.replace('%','')),
    formatValue: (value) => String(value) + '%',
    validateFunc: (value) => validateNumber({value, name: 'El porcentaje de grasa'}), 
  },
  condition: {
    name: 'condition',
    label: 'Condición',
    type: 'text',  
    parseValue: (value) => value === '' ? 'Ninguna' : value,
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

export const formatValues = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => {
  const formatValue = fieldsConfig[key].formatValue
  return [key ,formatValue ? formatValue(value) : value]
}))

export const parseValues = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => {
  const parseValue = fieldsConfig[key].parseValue
  return [key ,parseValue ? parseValue(value) : value]
}))

export const formatBank = (bank) => {
  let name = bank
  name = name.toLowerCase()
  name = name.split('_').map((word) => {
    return word !== 'de' 
      ? word[0].toUpperCase() + word.slice(1)
      : word
  }).join(' ')
  return name
}

export const paymentsFieldsConfig = {
  phone:{
    name: 'phone',
    label: 'Telefono',
    type: 'text',  
    placeholder: '',  
    validateFunc: (value, ) => validatePhone(value),
  },
  reference_number:{
    name: 'reference_number',
    label: 'Referencia',
    type: 'text',  
    placeholder: '',  
    validateFunc: (value ) => validateNumber({value, name: 'La referencia'}),
  },
  bank:{
    name: 'bank',
    label: 'Banco',
    type: 'enum',
    formatOption: (bank) => ({ label: formatBank(bank), value: bank }), 
    placeholder: '', 
  },
  amount:{
    name: 'amount',
    label: 'Monto',
    type: 'text',  
    placeholder: '',  
    parseValue: (value) => Number(value),
    validateFunc: (value ) => validateNumber({value, name: 'El monto'}),
  },
  image:{
    name: 'image',
    label: 'Captura del comprobante',
    type: 'file',  
    placeholder: '',  
    parseValue: (value) => Number(value),
  }
}

export const paymentsConfigArray = Object.entries(paymentsFieldsConfig).map(([,value]) => value)
