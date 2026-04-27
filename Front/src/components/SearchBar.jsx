import Icons from "./Icons";
import classes from "../styles/searchBar.module.scss";

export function SearchBar({filter, changeFilter}) {
  const handleChange = (event, param) => {
    const newFilter = {...filter}
    newFilter[param] = event.target.value
    changeFilter(newFilter)
  }

  return (
    <form className={classes.searchBar}>
      <button type="submit">
        <Icons icon='search' />
      </button>
      <input type="text" onChange={(event) => handleChange(event, 'query')}/>
      <select onChange={(event) => handleChange(event, 'field')}>
        <option value="id">Cedula</option>
        <option value="name">Nombre </option>
      </select>
    </form>
  )
}
// Necesito resivir el estado y como actualizarlo
// el estado necesita un espacio para el contenido que se esta buscando y un par en donde (si nombre o cedula)