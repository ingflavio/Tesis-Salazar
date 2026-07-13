import { useState } from "react"

export function validateNumber ({value, name, zeroAllowed = false, negativeAllowed= false}) {
  if(isNaN(value)) return `${name} debe ser un numero`
  else if (value == 0 && !zeroAllowed) return `${name} no puede ser 0`
  else if (value <= 0 && !negativeAllowed) return `${name} no puede ser negativo`
  else return true
}

export function validateIncrease ({value, previousValue, name, increase, increaseMasure = '', increaseAdjust=1, decreaseAllowed = true}) {
  const diference = value - previousValue
  const direction = diference > 0 ? 'incrementar' : 'reducir'
  if (diference < 0 && !decreaseAllowed) return `No puedes bajar tu ${name}, si tu ${name} tiene un valor incorrecto habla con un administrador`
  else if (Math.abs(diference) > increase) return `No puedes ${direction} tu ${name} mas de ${increase * increaseAdjust} ${increaseMasure}, si tu ${name} tiene un valor incorrecto habla con un administrador`
  else return true
}

export function validatePhone(value) {
  const regex = /^04(26|24|16|14|12|22)\d{7}$/;
  return regex.test(value) ? true : 'teléfono inválido';
}

export function validateEmail(value){
  const regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm
  return regex.test(value) ? true : 'correo inválido';
  
}

export default function useValidateForm(initialAlerts) {
  const [alerts, setAlerts] = useState(initialAlerts)

  const validateFields = (validations) => {
    // Cambiar las alertas para reflejar el nuevo estado
    const newAlerts = {...alerts}
    Object.entries(validations).map(([id, status]) => {
      if (status === true){
        newAlerts[id] = ''
      } else {
        newAlerts[id] = status
      }
    })
    setAlerts(newAlerts)
    // enviar el resultado
    return Object.entries(validations).every(field => field[1] === true)
  }
  
  return { alerts, validateFields, validateIncrease, validatePhone, validateEmail }
}