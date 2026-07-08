import { validateNumber, validatePhone, validateEmail } from '../hooks/useValidateForm'

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
    parseValue: (value) => Number(value),
    validateFunc: (value, previousValue) => validateNumber({value, previousValue, increase: 1}),
  },
  phone: {
    name: 'phone',
    label: 'telefono',
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
    formatValue: (value) => `${String(value)[0]},${String(value).slice(1)}`,
    validateFunc: (value, previousValue) => validateNumber({value, previousValue, increase: 5, increaseAdjust: 100, increaseMasure: 'm'}), 
  },
  weight: {
    name: 'weight',
    label: 'peso',
    type: 'text', 
    placeholder: '',
    parseValue: (value) => Number(value.replace(',','.')),
    formatValue: (value) => String(value).replace('.',','),
    validateFunc: (value, previousValue) => validateNumber({value, previousValue, increase: 5, increaseAdjust: 100, increaseMasure: 'kg'}), 
  },
  fat: {
    name: 'fat',
    label: 'Porcentaje de grasa',
    type: 'text',  
    parseValue: (value) => Number(value.replace('%','')),
    formatValue: (value) => String(value) + '%',
    validateFunc: (value, previousValue) => validateNumber({value, previousValue, increase: 5, increaseMasure: '%'}), 
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

export const formatValues = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => {
  const formatValue = fieldsConfig[key].formatValue
  return [key ,formatValue ? formatValue(value) : value]
}))

export const parseValues = (data) => Object.fromEntries(Object.entries(data).map(([key, value]) => {
  const parseValue = fieldsConfig[key].parseValue
  return [key ,parseValue ? parseValue(value) : value]
}))

const banks = [
  { label: 'Banco Central de Venezuela', value: '0001' },
  { label: 'Banco de Venezuela', value: '0102' },
  { label: 'Banco Venezolano de Crédito', value: '0104' },
  { label: 'Banco Mercantil', value: '0105' },
  { label: 'Banco Provincial', value: '0108' },
  { label: 'Banco del Caribe', value: '0114' },
  { label: 'Banco Exterior', value: '0115' },
  { label: 'Banco Caroní', value: '0128' },
  { label: 'Banesco', value: '0134' },
  { label: 'Banco Sofitasa', value: '0137' },
  { label: 'Banco Plaza', value: '0138' },
  { label: 'Banco de la Gente Emprendedora', value: '0146' },
  { label: 'Banco Fondo Común', value: '0151' },
  { label: '100% Banco', value: '0156' },
  { label: 'DelSur', value: '0157' },
  { label: 'Banco del Tesoro', value: '0163' },
  { label: 'Banco Agrícola de Venezuela', value: '0166' },
  { label: 'Bancrecer', value: '0168' },
  { label: 'Mi Banco', value: '0169' },
  { label: 'Banco Activo', value: '0171' },
  { label: 'Bancamiga', value: '0172' },
  { label: 'Banco Internacional de Desarrollo', value: '0173' },
  { label: 'Banplus', value: '0174' },
  { label: 'Banco Bicentenario del Pueblo', value: '0175' },
  { label: 'Banco de la Fuerza Armada Nacional Bolivariana', value: '0177' },
  { label: 'Banco Nacional de Crédito', value: '0191' },
  { label: 'Instituto Municipal de Crédito Popular', value: '0601' },
];

const paymentsFieldsConfig = {
  cedula:{
    name: 'cedula',
    label: 'cedula',
    type: 'text',
    placeholder: '',   
    parseValue: (value) => Number(value) 
  },
  phone:{
    name: 'phone',
    label: 'telefono',
    type: 'text',  
    placeholder: '',  
    validateFunc: (value, ) => validatePhone(value),
  },
  bank:{
    name: 'bank',
    label: 'banco',
    type: 'select', 
    placeholder: '',      
    options: banks
  },
  amount:{
    name: 'amount',
    label: 'monto',
    type: 'text',  
    placeholder: '',  
  },
  'date':{
    name: 'date',
    label: 'fecha',
    type: 'text',  
    placeholder: '',  
  },
}

export const paymentsConfigArray = Object.entries(paymentsFieldsConfig).map(([,value]) => value)
