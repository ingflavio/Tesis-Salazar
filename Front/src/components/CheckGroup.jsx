import { useRef } from "react"
import classes from '../styles/FormFields.module.scss'

export default function CheckGroup({options, label, onClickCallback}) {
  const checkedRef = useRef(null) 

  const handleClick = (event, value) => {
    const checkbox = event.target 
    if (checkedRef.current){
      if (checkedRef.current === checkbox){
        checkedRef.current = null
        onClickCallback(null)
      }else{
        checkedRef.current.checked = false
        checkedRef.current = checkbox
        onClickCallback(value)
      }
    }else {
      checkedRef.current = checkbox
      onClickCallback(value)
    }
  }

  return <fieldset className={classes.checkGroup}>
    <label>{label}</label>
    { options.map((option) => (
      
        <>
          <input type="checkbox" id={option.label} onClick={(event) => handleClick(event, option.value)}/>
          <label htmlFor={option.label}>{option.label}</label>
        </>
      ))
    }
  </fieldset>
}