import { useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import { Icons } from '../components/Icons'
import bot from '../images/bot.jpg'
import classes from '../styles/chat.module.scss'

export function ChatPage() {
  const textInput = useRef()
  const lastMsgRef = useRef()
  const { messages, addMessage } = useChat() 

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = textInput.current.value.trim()
    if (content) {
      addMessage('user', content)
      textInput.current.value = ''
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      <header className={classes.chatHeader}>
        <div className={classes.chatHeader_imgContainer}>
          <img src={bot} alt="Asistente bot" />
        </div>
        <h3>Bot asistente de ejercicio</h3>
      </header>

      <main className={classes.chat}>
        <ul className={classes.msgContainer}>
          {messages.map((msg, index) => {
            const className =  msg.autor === 'user' ? ` ${classes.user}` : ''

            return (
              <li
                key={index}
                ref={index === messages.length - 1 ? lastMsgRef : null}
                className={classes.msg + `${className}`}
              >
                {msg.content}
              </li>
            )
          })}
        </ul>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            ref={textInput}
            placeholder="Escribe tu mensaje..."
            aria-label="Mensaje para el bot"
          />
          <button type='submit' className={classes.chat_sendButton} aria-label="Enviar mensaje">
            <Icons icon='send' />
          </button>
        </form>
      </main>
    </>
  )
}