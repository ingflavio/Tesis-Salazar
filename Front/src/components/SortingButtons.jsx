import Icons from "./Icons";

export default function SortingButtons({ onClick, isActiveDirection }) {
  const handleClick = () => {
    if (isActiveDirection === null) onClick(true)
    else if (isActiveDirection === true) onClick(false)
    else if (isActiveDirection === false) onClick(null)
  }

  return (
    <div className='sortButtons-wrapper'>
      <button className={isActiveDirection === true ? 'highlight' : ''} onClick={handleClick}>
        <Icons icon='triangle' />
      </button>
      <button className={isActiveDirection === false ? 'highlight' : ''} onClick={handleClick}>
        <Icons icon='triangle' />
      </button>
    </div>
  )
}