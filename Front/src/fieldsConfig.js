export const fieldsConfig = {
  id: {
    name: 'id',
    label: 'cedula',
    type: 'text',    
  },
  name: {
    name: 'name',
    label: 'nombre',
    type: 'text',    
  },
  lastName: {
    name: 'lastName',
    label: 'apellido',
    type: 'text',    
  },
  age: {
    name: 'age',
    label: 'edad',
    type: 'number',  
    min: 18,
    max: 80     
  },
  sex: {
    name: 'sex',
    label: 'sexo',
    type: 'boolean',       
    formatValue: (value) => value ? 'femenino' : 'masculino',
    options: [{ label: 'femenino', value: true }, { label: 'masculino', value: false }],
  },
  phone: {
    name: 'phone',
    label: 'telefono',
    type: 'text',    
  },
  height: {
    name: 'height',
    label: 'altura',
    type: 'number',  
    min: 18,
    max: 80     
  },
  weight: {
    name: 'weight',
    label: 'peso',
    type: 'number', 
    step: 0.1, 
    min: 50,
    max: 100     
  },
  fat: {
    name: 'fat',
    label: 'Porcentaje de grasa',
    type: 'number',  
    min: 18,
    max: 80     
  },
  condition: {
    name: 'condition',
    label: 'condición',
    type: 'text',    
  },
  solvency: {
    name: 'solvency',
    label: 'Solvencia',
    type: 'boolean',       
    formatValue: (value) => value ? 'Solvente' : 'No solvente',
    parseValue: (value) => value === 'Solvente',
    options: [{ label: 'Solvente', value: true }, { label: 'Insolvente', value: false }],
  },
}