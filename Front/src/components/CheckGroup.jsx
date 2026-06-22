import { useRef } from "react"
import classes from '../styles/FormFields.module.scss'

export default function CheckGroup({options, name,label, onClickCallback = null}) {
  const checkedRef = useRef(null) 

  const handleClick = (button) => {
    if (checkedRef.current){
      if (checkedRef.current === button){
        checkedRef.current.checked = false
        checkedRef.current = null
        if (onClickCallback) onClickCallback(null)
      }else{
        checkedRef.current.checked = false
        checkedRef.current = button
        if (onClickCallback) onClickCallback(button.value)
      }
    }else {
      checkedRef.current = button
      if (onClickCallback) onClickCallback(button.value)
    }
  }

  return <fieldset className={classes.checkGroup}>
    {label && <label htmlFor={name}>{label}</label>}
    { options.map((option) => (
      
        <>
          <input type="radio" name={name} value={option.value} id={option.label} onClick={(event) => handleClick(event.target)}/>
          <label htmlFor={option.label}>{option.label}</label>
        </>
      ))
    }
  </fieldset>
}