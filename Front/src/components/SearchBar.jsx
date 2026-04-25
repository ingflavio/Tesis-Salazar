import Icons from "./Icons";
import classes from "../styles/searchBar.module.scss";

export function SearchBar() {
  return (
    <form className={classes.searchBar}>
      <button type="submit">
        <Icons icon='search' />
      </button>
      <input type="text" />
      <select>
        <option value="id">Cedula</option>
        <option value="name">Nombre </option>
      </select>
    </form>
  )
}