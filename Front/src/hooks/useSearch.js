import { useState } from "react"

export function useSearch(){
  const [filter, setFilter] = useState({query:'', field:'id'})

  const filterById = (object) => object.id.includes(filter.query)

  const filterByName = (object) => {
    const fullName = `${object.name} ${object.lastName}` 
    return fullName.toLowerCase().includes(filter.query) 
  }

  const filterFunc = (list) => {
    return list.filter((object) => {
      const filterByField = filter.field === 'id' 
      ? filterById
      : filterByName
      return filterByField(object) || filter.query === ''
    })
  } 

  return { filterFunc, filter, changeFilterParams: setFilter}
}

export default useSearch