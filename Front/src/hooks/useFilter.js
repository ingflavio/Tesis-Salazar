import { useState } from "react"

export default function useFilter(){
  const [filters, setFilters] = useState([])

  const filterString = (value, query) => value.includes(query.toLocaleLowerCase())

  const filterNumber = (value, query) => String(value).includes(query.toLocaleLowerCase())


  const filterBoolean = (value, query) => value === query

  const filterFunc = (object) => {
    const checkList = []
    for (const filter of filters) {
      const value = object[filter.field]
      const type = typeof value
      if (type === 'string') checkList.push(filterString(value, filter.query))
      else if (type === 'number') checkList.push(filterNumber(value, filter.query))
      else if (type === 'boolean') checkList.push(filterBoolean(value, filter.query))
    }
    if (checkList.length === 0) return true
    return checkList.every((item) => item)
  } 

  const changeFilterParams = (query, field) => {
    const index = filters.findIndex((element) => element.field === field)
    const newFilters = [...filters]
    if(query === '' || query === null){
      newFilters.splice(index, 1)
    }
    else if (index === -1) {
      newFilters.push({field, query})
    } else {
      newFilters[index].query = query
    }
    setFilters(newFilters)
  }

  return { filters, filterFunc, changeFilterParams}
}