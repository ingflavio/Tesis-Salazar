import { Outlet, Navigate, Link } from 'react-router';
import { useScreen } from '../hooks/useScreen.js';
import { useSession } from '../hooks/useSession.js';
import Icons from '../components/Icons.jsx';
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
        {
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
            <h5>owo</h5>
            <span> nombre y apellido</span>
            <span>rol</span>
            <nav>
              <ul>
                <li>
                  <Link to={'/admin'}>inicio</Link>
                </li>
                <li>
                  <Link to={'/admin/table'}>Clientes</Link>
                </li>
                <li>
                  <Link to={'/admin'}>Gestion de maquinas</Link>
                </li>
              </ul>
              <button>Cerrar Sesion</button>  
            </nav>
          </aside>
        }
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