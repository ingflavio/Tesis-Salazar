import { Outlet, Navigate } from 'react-router';
import { NavigationBar } from '../components/NavigationBar.jsx';
import { useUser } from '../hooks/useUser.js';
import { useScreen } from '../hooks/useScreen.js';
import { useUsers } from '../hooks/useUsers.js';

export function UserLayout() {
  const { checkAdmin } = useUsers()
  const { user } = useUser()
  const screen = useScreen()  
  if (!user) return <Navigate to='/login' replace />

  const admin = checkAdmin(user)

  const isDesktop = screen.width > 650 

  return (
    <>
      {/* <span className='debuger'>
        {JSON.stringify(user)}
        <button onClick={handleClick}>salir</button> 
      </span> */}
      {
        isDesktop && 
        <header>
          <NavigationBar admin={admin}/>
        </header>
      }
      <div>
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