import { useContext } from "react"
import { userContext } from "../context/user"

export function useUser() {
  const context = useContext(userContext)

  return context
}

export default useUser