import { useState } from "react"

export function useChat(){
  const [messages, setMessages] = useState([
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit '
    },
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio. Debitis fugit, iure, sint reprehenderit enim cupiditate vel repudiandae consequuntur est voluptate at. Labore quas dolor quisquam soluta ipsam iure eveniet earum.'
    },
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio.'
    },
    {
      autor: 'user',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit '
    },
    {
      autor: 'bot',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, minus quasi est error suscipit distinctio molestiae esse rerum eligendi libero quo debitis ratione earum harum cupiditate laboriosam perferendis quas odio. Debitis fugit, iure, sint reprehenderit enim cupiditate vel repudiandae consequuntur est voluptate at. Labore quas dolor quisquam soluta ipsam iure eveniet earum.'
    }
  ])
  
  const addMessage = (autor, content) => {
    const msg = { autor, content }
    setMessages([...messages, msg])
  }

  return { messages, addMessage }
}