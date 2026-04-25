import { createContext, useReducer } from "react";
import { initialState, reducerUser } from "../reducers/user";
import { useNavigate } from "react-router";

export const userContext = createContext()

function useUserReducer (){
  const [state, dispatch] = useReducer(reducerUser, initialState )

  const login = (data) => {
    dispatch({
      type: 'LOGIN',
      playload: data
    })
  }

  const logOut = () => {
    dispatch({type: 'LOG_OUT'})
  }

  return { state, login, logOut }
}

export function UserProvider ({children}) {
  const {state, login, logOut} = useUserReducer()
  const navigate = useNavigate()
  
  return (
    <userContext.Provider value={{
      user: state,
      login: (data) => {
        login(data)
        navigate('/')
      },
      logOut: () => {
        logOut()
        navigate('login')
      }
    }} >
      {children}
    </userContext.Provider>
  )
}