import { useRef } from "react"
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
    { options.map((option) => (
      
        <>
          <input type="radio" id={`${id}-${option.value}`} 
            name={name} value={option.value}  
            onClick={(event) => handleClick(event.target)}
          />
          <label htmlFor={option.label}>{option.label}</label>
        </>
      ))
    }
  </fieldset>
}