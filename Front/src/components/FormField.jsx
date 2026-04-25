import { useState } from "react"

export function FormField({name, type = 'text', label = name, placeholder = '', initialValue }){
  const [labelPosition, setLabelPosition] = useState(initialValue ? 'up' : 'down')

  const checkContent = (event) => {
    setLabelPosition(event.target.value !== '' ? 'up' : 'down')
  }

  const handleBlur = (event) => {
    if (event.target.value === '' && labelPosition === 'up') setLabelPosition('down')
  }

  const defalutValue = initialValue ? {defaultValue: initialValue} : {}

  return (
    <div className="form-field">
      <label htmlFor={name} className={labelPosition}>{label}</label>
      <input id={name} name={name} type={type} 
        placeholder={placeholder}
        {...defalutValue}
        onChange={checkContent} 
        onClick={() => setLabelPosition('up')} 
        onBlur={handleBlur}
        onFocus={() => setLabelPosition('up')}
      />
    </div>
  )
}

export default FormField