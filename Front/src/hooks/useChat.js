import { useState } from "react"

export function useChat(initialMessage){
  const [messages, setMessages] = useState([initialMessage])
  
  const addMessage = (autor, content) => {
    const msg = { autor, content }
    setMessages([...messages, msg])
  }

  return { messages, addMessage }
}