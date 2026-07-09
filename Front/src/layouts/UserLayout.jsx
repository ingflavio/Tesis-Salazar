import { Outlet, Navigate } from 'react-router';
import { NavigationBar } from '../components/NavigationBar.jsx';
import { useSession } from '../hooks/useSession.js';
import { useScreen } from '../hooks/useScreen.js';

export function UserLayout() {
  const { session } = useSession()
  const screen = useScreen()  
  console.log(session)
  if (!session) return <Navigate to='/login' replace />
  if (session.rol !== 'user') return <Navigate to='/login' replace />

  const isDesktop = screen.width > 750 

  return (
    <>
      {
        isDesktop && 
        <header>
          <NavigationBar />
        </header>
      }
      <div className='route'>
        <Outlet />
      </div>
      {
        !isDesktop && 
        <footer>
          <NavigationBar />
        </footer>
      }
    </>
  )
}