import React, { useRef } from "react"
import classes from '../styles/FormFields.module.scss'

export default function CheckGroup({options, name, label, id, onChange = null}) {
  const checkedRef = useRef(null) 

  const handleClick = (button) => {
    if (checkedRef.current){
      if (checkedRef.current === button){
        checkedRef.current.checked = false
        checkedRef.current = null
        if (onChange) onChange(null)
      }else{
        checkedRef.current.checked = false
        checkedRef.current = button
        if (onChange) onChange(button.value)
      }
    }else {
      checkedRef.current = button
      if (onChange) onChange(button.value)
    }
  }

  return <fieldset className={classes.checkGroup}>
    {label && <label htmlFor={name}>{label}</label>}
    {options.map((option) => (
      <React.Fragment key={option.label}>
        <input 
          type="radio" 
          id={`${id}-${option.value}`} 
          name={name} 
          value={option.value}
          onClick={(event) => handleClick(event.target)}
        />
        <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
      </React.Fragment>
    ))}
  </fieldset>
}