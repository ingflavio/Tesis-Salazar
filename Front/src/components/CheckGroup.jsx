import { useRef } from "react"

export default function CheckGroup({options, onClickCallback}) {
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

  return options.map((option) => (
    <>
      <input type="checkbox" name={option.name} onClick={(event) => handleClick(event, option.value)}/>
      <label htmlFor={option.name}>{option.label}</label>
    </>
  ))
}