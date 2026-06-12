import { Outlet, Navigate } from 'react-router';
import { useUser } from '../hooks/useUser.js';
import { useUsers } from '../hooks/useUsers.js';

export default function AdminLayout() {
  const { checkAdmin, getUser } = useUsers()
  const { user } = useUser()
  if (!user) return <Navigate to='/login' replace />
  if (!getUser(user)) return <Navigate to='/login' replace />
  if (!checkAdmin(user)) return <Navigate to='/login' replace />


  return (
    <>
      <header>
        admin
      </header>
      <div className='route'>
        <Outlet />
      </div>
    </>
  )
}