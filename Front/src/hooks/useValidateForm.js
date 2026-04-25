import { useState } from "react"

export function useValidateForm(initialAlerts) {
  const [alerts, setAlerts] = useState(initialAlerts)

  const validateIncrease = ({value, previousValue, name, increase, increaseMasure = '', increaseAdjust=1, decreaseAllowed = true}) => {
    const diference = value - previousValue
    const direction = diference > 0 ? 'incrementar' : 'reducir'
    if (diference < 0 && !decreaseAllowed) return `No puedes bajar tu ${name}, si tu ${name} tiene un valor incorrecto habla con un administrador`
    else if (Math.abs(diference) > increase) return `No puedes ${direction} tu ${name} mas de ${increase * increaseAdjust} ${increaseMasure}, si tu ${name} tiene un valor incorrecto habla con un administrador`
    else return true
  }

  function validatePhone(value) {
    const regex = /^04(26|24|16|14)\d{7}$/;
    return regex.test(value) ? true : 'teléfono inválido';
  }

  const validateFields = (fields, validations) => {
    const validationStatus = fields.map((field) => {return {id: field.id, status:validations[field.id](field)}})
    // Cambiar las alertas para reflejar el nuevo estado
    const newAlerts = {...alerts}
    validationStatus.map(field => {
      if (field.status === true){
        newAlerts[field.id] = ''
      } else {
        newAlerts[field.id] = field.status
      }
    })
    setAlerts(newAlerts)
    // enviar el resultado
    return validationStatus.every(field => field.status === true)
  }
  
  return {alerts, validateFields, validateIncrease, validatePhone}
}

export default useValidateForm