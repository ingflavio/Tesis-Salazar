import { useState } from "react"
import classes from '../styles/FormFields.module.scss'

export default function RoundField({name, type = 'text', label = name, placeholder = '', initialValue }){
  const [labelPosition, setLabelPosition] = useState(initialValue ? classes.up : '')

  const checkContent = (event) => {
    setLabelPosition(event.target.value !== '' ? classes.up : '')
  }

  const handleBlur = (event) => {
    if (event.target.value === '' && labelPosition === classes.up) setLabelPosition('')
  }

  const defalutValue = initialValue ? {defaultValue: initialValue} : {}

  return (
    <fieldset className={classes.roundField}>
      <label htmlFor={name} className={labelPosition}>{label}</label>
      <input id={name} name={name} type={type} 
        placeholder={placeholder}
        {...defalutValue}
        onChange={checkContent} 
        onClick={() => setLabelPosition('up')} 
        onBlur={handleBlur}
        onFocus={() => setLabelPosition('up')}
      />
    </fieldset>
  )
}