import { useState } from "react";
import Icons from "./Icons";

export default function ChevronButton({onClick}) {
  const [direction, setDirection] = useState(true)

  const handleClick = () => {
    onClick()
    setDirection(!direction)
  }

  return (
    <button className={`sortButton ${direction? '' : 'sortButton--fliped'}`} onClick={handleClick}>
      <Icons icon='chevron' />
    </button>
  )
}