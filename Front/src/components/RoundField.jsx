import { useState, useEffect } from "react"
import classes from '../styles/FormFields.module.scss'

export default function RoundField({name, type = 'text', label = name, placeholder = '', initialValue }){
  const [labelPosition, setLabelPosition] = useState(initialValue ? classes.up : '')

  const checkContent = (event) => {
    const hasValue = event.target.value !== ''
    setLabelPosition(hasValue ? classes.up : '')
  }

  const handleBlur = (event) => {
    // Solo mover hacia abajo si no tiene valor Y no está enfocado
    if (event.target.value === '') {
      setLabelPosition('')
    }
  }

  const handleFocus = () => {
    // Siempre mover hacia arriba al enfocar
    setLabelPosition(classes.up)
  }

  const defaultValue = initialValue ? {defaultValue: initialValue} : {}

  return (
    <fieldset className={classes.roundField}>
      {label && <label htmlFor={name} className={labelPosition}>{label}</label>}
      <input 
        id={name} 
        name={name} 
        type={type} 
        placeholder={placeholder}
        {...defaultValue}
        onChange={checkContent} 
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </fieldset>
  )
}