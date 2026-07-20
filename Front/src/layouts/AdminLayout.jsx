import { Outlet, Navigate, Link, useLocation } from 'react-router';
// import { useEffect } from 'react';
import { useScreen } from '../hooks/useScreen.js';
import { useSession } from '../hooks/useSession.js';
import Icons from '../components/Icons.jsx';
import classes from '../styles/admin.module.scss'
import { useEffect, useState } from 'react';
import useUsers from '../hooks/useUsers.js';

function AdminNav({ children }) {
  const location = useLocation()
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(()=>{
    setPathname(location.pathname)
  },[location.pathname])
  
  const links = [
    {
      text: 'inicio',
      path: '/admin',
      icon: 'home'
    },
    {
      text: 'clientes',
      path: '/admin/table',
      icon: 'user'
    },
    {
      text: 'finanzas',
      path: '/admin/finance',
      icon: 'finance'
    },
    {
      text: 'Escaner de Qr',
      path: '/admin/scan',
      icon: 'qr'
    }
  ]

  return <nav>
    <ul className={classes.links_list}>{
      links.map((link) => <li className={`${pathname == link.path ? classes.selected_link : ""} ${classes.link}`} key={link.path}>
        <Link to={link.path}>
          <Icons icon={link.icon} />
          {link.text}
        </Link>
      </li>)
    }</ul>
    {children} 
  </nav>
}

export default function AdminLayout() {
  const screen = useScreen()  
  const { session, logOut } = useSession()
  const { admin, getAdmin } = useUsers()

  useEffect( () => {
    if(session) getAdmin(session.id)
  }, [session]) 

  if (!session) {
    return <Navigate to='/login' replace />
  }
  if (session.rol !== 'admin') return <Navigate to='/' replace />


  const isDesktop = screen.width > 850 

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
              {admin && <h6 style={{textTransform: 'capitalize'}}> {admin.name} </h6>}
              <i>Administrador</i>
              <AdminNav>
                <button onClick={logOut}>
                  Cerrar Sesion
                </button>
              </AdminNav>
            </div>
          </aside>
        {admin && <Outlet context={{name: admin.name}} />}
      </div>
    </>
  )
}