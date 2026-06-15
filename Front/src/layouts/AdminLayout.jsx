import { Outlet, Navigate } from 'react-router';
import { useScreen } from '../hooks/useScreen.js';
import { useUser } from '../hooks/useUser.js';
import { useUsers } from '../hooks/useUsers.js';
import classes from '../styles/admin.module.scss'

export default function AdminLayout() {
  const { checkAdmin, getUser } = useUsers()
  const screen = useScreen()  
  const { user } = useUser()
  if (!user) return <Navigate to='/login' replace />
  if (!getUser(user)) return <Navigate to='/login' replace />
  if (!checkAdmin(user)) return <Navigate to='/login' replace />

  const isDesktop = screen.width > 750 

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