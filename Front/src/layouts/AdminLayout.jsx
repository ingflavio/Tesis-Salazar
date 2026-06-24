import { Outlet, Navigate } from 'react-router';
import { useScreen } from '../hooks/useScreen.js';
import { useSession } from '../hooks/useSession.js';
import classes from '../styles/admin.module.scss'

export default function AdminLayout() {
  const screen = useScreen()  
  const { session } = useSession()
  if (!session) {
    return <Navigate to='/login' replace />
  }
  if (session.rol.toLowerCase() !== 'admin') return <Navigate to='/' replace />

  const isDesktop = screen.width > 700 

  return (
    <>
      {
        isDesktop && 
      <header className={classes.adminHeader}>
        <h4>Administracion</h4>
      </header>
      }
      <div className={classes.route}>
        <Outlet />
      </div>
      {
        !isDesktop && 
      <footer className={classes.adminFooter}>
        <h4>Administracion</h4>
      </footer>
      }
    </>
  )
}