import { Outlet, Navigate, Link } from 'react-router';
import { useEffect } from 'react';
import { useScreen } from '../hooks/useScreen.js';
import { useSession } from '../hooks/useSession.js';
import Icons from '../components/Icons.jsx';
import classes from '../styles/admin.module.scss'
import useUsers from '../hooks/useUsers.js';

function AdminNav() {
  return <nav>
    <ul className={classes.links_list}>
      <li className={classes.link}>
        <Link to={'/admin'}>
          <Icons icon='home' />
          inicio
        </Link>
      </li>
      <li className={classes.link}>
        <Link to={'/admin/table'}>
          <Icons icon='user' />
          Clientes
        </Link>
      </li>
      <li className={classes.link}>
        <Link to={'/admin/finance'}>
          <Icons icon='finance' />
          Finanzas
        </Link>
      </li>
    </ul>
    <button>Cerrar Sesion</button>  
  </nav>
}

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
              <h6> Jose Olival </h6>
              <i>Administrador</i>
              <AdminNav />
            </div>
          </aside>
        <Outlet />
      </div>
    </>
  )
}