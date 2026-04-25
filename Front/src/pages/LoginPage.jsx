import { useState } from 'react'
import { useUser} from '../hooks/useUser'
import { useUsers } from '../hooks/useUsers'
import FormField from '../components/FormField'
import classes from '../styles/login.module.scss'

export function LoginPage(){
  const { login } = useUser()
  const { getUsers } = useUsers()
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())
    const users = getUsers()
    const user = users.find((item) => item.id === Number(data.id) && item.password === Number(data.password))
    user ? login(Number(data.id)) : setError(true)
  }

  return(
    <main className={classes.loginPage}>
      <form className={classes.formLogin} onSubmit={handleSubmit}>
        <h3>Inicia sesion</h3>
        <FormField name='id' label='Cedula' />
        <FormField name='password' label='Contraseña' type="password"/>  
        {error && <span className='error-msg'>La cedula o contraseña son incorrectas</span>}
        <button type="submit">Ingresar</button>
      </form>
    </main>
  )
}