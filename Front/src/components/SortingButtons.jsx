import Icons from "./Icons";

export default function SortingButtons({ onClick, isActiveDirection }) {
  const handleClick = (button) => {
    if (isActiveDirection === null) {
      if (button === 'top') onClick(true) 
      else onClick(false) 
    }
    else if (isActiveDirection === true) { 
      if (button === 'top') onClick(null) 
      else onClick(false) 
    } 
    else if (isActiveDirection === false) { 
      if (button === 'top') onClick(true) 
      else onClick(null) 
    } 
  }

  return (
    <div className='sortButtons-wrapper'>
      <button className={isActiveDirection === true ? 'highlight' : ''} onClick={() => handleClick('top')}>
        <Icons icon='triangle' />
      </button>
      <button className={isActiveDirection === false ? 'highlight' : ''} onClick={() => handleClick('bottom')}>
        <Icons icon='triangle' />
      </button>
    </div>
  )
}