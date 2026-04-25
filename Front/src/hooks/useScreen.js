import { useContext } from "react"
import { screenContext } from "../context/screen" 

export function useScreen() {
  const context = useContext(screenContext) 

  return context
}