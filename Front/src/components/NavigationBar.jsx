import { Link } from "react-router"
import { Icons } from "./Icons"
import { useScreen } from '../hooks/useScreen'
import classes from '../styles/navigationBar.module.scss'

export function NavigationBar({admin = false}) {
  const screen = useScreen()
  const isDesktop = screen.width > 750 
  
  return(
    <nav className={classes.navigationBar}>
      <Link to={'/scan'}>
          <Icons icon='qrscan'/>
          {isDesktop && <span>escanear QR</span>}
      </Link>

      <Link to={'/qr'}>
          <Icons icon='qr'/>
          {isDesktop && <span>QR de Entrada</span>}
      </Link>

      <Link to={'/'}>
        <Icons icon='home'/>
          {isDesktop && <span>Inicio</span>}
      </Link>
      {
        !admin &&
        <Link to={'/profile'}>
          <Icons icon='profile'/>
            {isDesktop && <span>Perfil</span>}
        </Link>
      }
    </nav>
  )
}