import { useState } from "react";
import Icons from "./Icons";

export default function SortingButton({onClick}) {
  const [direction, setDirection] = useState(null)

  let clasName = 'sortButton'
    
  if (direction === true){
    clasName += ' sortButton--up'
  } else if (direction === false){
    clasName += ' sortButton--down'
  }

  const handleClick = () => {
    onClick()
    if (direction === null){
      setDirection(true)
    } else if (direction === true){
      setDirection(false)
    } else if (direction === false){
      setDirection(null)
    }
  }

  return (
    <button className={clasName} onClick={handleClick}>
      <Icons icon='triangle' />
      <Icons icon='triangle' />
    </button>
  )
}