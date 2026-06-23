import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useChat } from '../hooks/useChat'
import { Icons } from '../components/Icons'
import bot from '../images/bot.jpg'
import leg_press from '../images/leg-press.gif'
import pec_deck_fly from '../images/pec-deck-fly.gif'
import seated_cable_row from '../images/seated-cable-row.gif'
import classes from '../styles/chat.module.scss'

export function ChatPage() {
  const location = useLocation()
  const machine = location.state.machine 

  const machineTable = {
    1: {
      content: `Hola Luis, veo que necesitas ayuda con la maquina de aperturas. Esta es una máquina que entrena principalmente el pecho (pectorales). Te recomiendo empezar con 3 series utilizando un peso de 20 a 25 kilogramos (44 a 55 libras), y concéntrate en mantener los codos ligeramente flexionados y juntar los brazos con control, sin chocar los topes, para sentir bien la contracción del pecho.`,
      gif: pec_deck_fly,
      alt: 'Ejemplo de uso de la maquina de aperturas'
    },
    2: {
      content:'Hola Luis, veo que necesitas ayuda con el ejercicio prensa de piernas. Esta es una máquina que entrena el cuádriceps, los isquiotibiales y los glúteos. Te recomiendo empezar con 3 series utilizando un peso de 50 a 60 kilogramos (110 a 132 libras) sin contar la plataforma vacía, y asegúrate de no bloquear las rodillas al subir ni bajar demasiado la plataforma para mantener la zona lumbar siempre apoyada contra el respaldo.',
      gif: leg_press,
      alt: 'Ejemplo de uso de prensa de piernas'
    },
    3: {
      content:'Hola Luis, veo que necesitas ayuda con el ejercicio remo sentado con polea baja. Esta es una máquina que entrena la espalda (dorsales y romboides). Te recomiendo empezar con 3 series utilizando un peso de 25 a 30 kilogramos (55 a 66 libras), manteniendo la espalda recta, echando los hombros hacia atrás al final del movimiento y evitando usar el impulso del cuerpo para jalar el peso.',
      gif: seated_cable_row,
      alt: 'Ejemplo de uso de remo sentado con polea baja'
    }
  }

  const { messages, addMessage } = useChat({autor: 'bot', ...machineTable[machine]}) 
  const textInput = useRef()
  const lastMsgRef = useRef()

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
    <div className={classes.chatLayout}>
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
                <p>{msg.content}</p>
                {
                  msg.gif &&
                  <div className={classes.msg_imgContainer}>
                    <img src={msg.gif} alt={msg.alt} />
                  </div>
                }
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
    </div>
  )
}