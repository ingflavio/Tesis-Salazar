export const fieldsConfig = {
  id: {
    name: 'id',
    label: 'cedula',
    type: 'text',
    placeholder: '',    
  },
  name: {
    name: 'name',
    label: 'nombre',
    type: 'text', 
    placeholder: '',   
  },
  lastName: {
    name: 'lastName',
    label: 'apellido',
    type: 'text',  
    placeholder: '',  
  },
  age: {
    name: 'age',
    label: 'edad',
    type: 'number', 
    placeholder: '', 
    min: 18,
    max: 80     
  },
  sex: {
    name: 'sex',
    label: 'sexo',
    type: 'boolean',       
    placeholder: '', 
    formatValue: (value) => value ? 'femenino' : 'masculino',
    options: [{ label: 'femenino', value: 'f' }, { label: 'masculino', value: 'm' }],
  },
  phone: {
    name: 'phone',
    label: 'telefono',
    type: 'text',  
    placeholder: '',  
  },
  height: {
    name: 'height',
    label: 'altura',
    type: 'number',       
    placeholder: '', 
    min: 1.40,
    max: 2.00     
  },
  weight: {
    name: 'weight',
    label: 'peso',
    type: 'number', 
    placeholder: '',
    step: 0.1, 
    min: 50,
    max: 100     
  },
  fat: {
    name: 'fat',
    label: 'Porcentaje de grasa',
    type: 'number',  
    placeholder: '',
    min: 18,
    max: 80     
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
    formatValue: (value) => value ? 'Solvente' : 'No solvente',
    parseValue: (value) => value === 'Solvente',
    options: [{ label: 'Solvente', value: true }, { label: 'Insolvente', value: false }],
  },
}

export const configArray = Object.entries(fieldsConfig).map(([,value]) => value)