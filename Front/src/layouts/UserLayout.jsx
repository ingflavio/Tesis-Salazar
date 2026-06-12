import { Outlet, Navigate } from 'react-router';
import { NavigationBar } from '../components/NavigationBar.jsx';
import { useUser } from '../hooks/useUser.js';
import { useScreen } from '../hooks/useScreen.js';
import { useUsers } from '../hooks/useUsers.js';

export function UserLayout() {
  const { checkAdmin, getUser } = useUsers()
  const { user } = useUser()
  const screen = useScreen()  
  if (!user) return <Navigate to='/login' replace />
  if (!getUser(user)) return <Navigate to='/login' replace />

  const admin = checkAdmin(user)

  const isDesktop = screen.width > 750 

  return (
    <>
      {
        isDesktop && 
        <header>
          <NavigationBar admin={admin}/>
        </header>
      }
      <div className='route'>
        <Outlet />
      </div>
      {
        !isDesktop && 
        <footer>
          <NavigationBar admin={admin}/>
        </footer>
      }
    </>
  )
}