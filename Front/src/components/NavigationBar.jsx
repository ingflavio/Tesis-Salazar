import { Link } from "react-router"
import { Icons } from "./Icons"
import { useScreen } from '../hooks/useScreen'
import classes from '../styles/navigationBar.module.scss'

export function NavigationBar({admin = false}) {
  const screen = useScreen()
  const isDesktop = screen.width > 750 
  
  return(
    <nav className={classes.navigationBar}>
      {
        admin && 
        <Link to={'/admin'}>
          <Icons icon='gear'/>
          {isDesktop && <span>Administracion</span>}
        </Link>
      }

      <Link to={'/camera'}>
          <Icons icon='qr'/>
          {isDesktop && <span>escanear QR</span>}
      </Link>

      <Link to={'/'}>
        <Icons icon='home'/>
          {isDesktop && <span>Inicio</span>}
      </Link>

      <Link to={'/chat'}>
        <Icons icon='chat'/>
          {isDesktop && <span>Chat con bot</span>}
      </Link>

      <Link to={'/profile'}>
        <Icons icon='profile'/>
          {isDesktop && <span>Perfil</span>}
      </Link>
    </nav>
  )
}