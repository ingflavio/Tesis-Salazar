import { Outlet, Navigate, Link } from 'react-router';
import { useScreen } from '../hooks/useScreen.js';
import { useSession } from '../hooks/useSession.js';
import Icons from '../components/Icons.jsx';
import classes from '../styles/admin.module.scss'
import useUsers from '../hooks/useUsers.js';
import { useEffect } from 'react';

export default function AdminLayout() {
  const screen = useScreen()  
  const { session } = useSession()
  const { user, getUser } = useUsers()

  useEffect( () => {
    // console.log(session)
    if(session) getUser(session.id)
  }, [session]) 
  if (!session) {
    return <Navigate to='/login' replace />
  }
  if (session.rol.toLowerCase() !== 'admin') return <Navigate to='/' replace />


  const isDesktop = screen.width > 850 
  console.log(user)

  return (
    <>
      {
        isDesktop && 
      <header className={classes.adminHeader}>
        <h4>Administracion</h4>
      </header>
      }
      <div className={classes.route}>
        {
          !isDesktop && 
          <span></span>
        }
          <aside className={classes.sideBar}>
            {
              !isDesktop && 
              <>
                <label htmlFor="hide-aside" className={classes.hideButton} role='button'>
                  <Icons icon='bars'/>
                  <input type='checkbox' id='hide-aside' />
                </label>
              </>
            }
            <div className={classes.hideWrapper}>
              <h6> {session.name} </h6>
              <span>Administrador</span>
              <nav>
                <ul>
                  <li>
                    <Link to={'/admin'}>inicio</Link>
                  </li>
                  <li>
                    <Link to={'/admin/table'}>Clientes</Link>
                  </li>
                  <li>
                    <Link to={'/admin'}>Finanzas</Link>
                  </li>
                </ul>
                <button>Cerrar Sesion</button>  
              </nav>
            </div>
          </aside>
        <Outlet />
      </div>
    </>
  )
}