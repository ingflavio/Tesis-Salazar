import { useSession } from "../hooks/useSession"
import useUsers from "../hooks/useUsers";

import ProfileCard from '../components/ProfileCard'
import { useEffect } from "react";

export default function ProfilePage(){
  const { session } = useSession()
  const { getUser, user } = useUsers()
  
  useEffect(() => {
    if (session) getUser(session.id)
  }, [session])
  return <main>
    <h1>Perfil</h1>
    {/* <ProfileCard /> */}
  </main>
}