import { useState } from "react"

export function useChat(){
  const [messages, setMessages] = useState([])
  
  const addMessage = (autor, content) => {
    const msg = { autor, content }
    setMessages([...messages, msg])
  }

  return { messages, addMessage }
}