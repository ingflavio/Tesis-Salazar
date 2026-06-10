export default function useSorter({ field = null, direction = null }) {
  const SortByAtribute = ({array, atribute, compareFn = null, descending = false}) => {
    const index = descending ? 1 : 0
    array.sort((item1, item2) => {
      const atributeArray = [item1[atribute], item2[atribute]]
      compareFn ? atributeArray.sort(compareFn) : atributeArray.sort()
      if (atributeArray[index] === item1[atribute]) return -1
      return 1
    })
    return array
  }

  const sorter = (array) => {
    const sortFns = {
      'id-ascending': () => SortByAtribute({array, atribute:'id', compareFn: (a, b) => {
        if (Number(a) > Number(b)) return -1
        else if (Number(b) > Number(a)) return 1
        return 0
      }}),
      'id-descending': () => SortByAtribute({array, atribute: 'id', compareFn: (a, b) => {
        if (Number(b) > Number(a)) return -1
        else if (Number(a) > Number(b)) return 1
        return 0
      }}),
      'name-ascending': () => SortByAtribute({array, atribute: 'name'}),
      'name-descending': () => SortByAtribute({array, atribute: 'name', descending: true}),
      'lastName-ascending': () => SortByAtribute({array, atribute: 'lastName'}),
      'lastName-descending': () => SortByAtribute({array, atribute: 'lastName', descending: true}),
      'solvency-ascending': () => SortByAtribute({array, atribute: 'solvency', compareFn: (a, b) => {
        if (a) return -1
        else if (b) return 1
        return 0
      }}),
      'solvency-descending': () => SortByAtribute({array, atribute: 'solvency', compareFn: (a, b) => {
        if (!a) return -1
        else if (!b) return 1
        return 0
      }}),
    }
    if (field) {
      const key = `${field}-${direction ? 'ascending' : 'descending'}`
      return sortFns[key](array)
    }
    return array
  }

  return { sorter }
}