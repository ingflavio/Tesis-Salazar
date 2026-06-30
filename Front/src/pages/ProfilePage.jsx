import { useSession } from "../hooks/useSession"
// import useUsers from "../hooks/useUsers";
import getUser from '../mocks/GET_users{id}'
import ProfileCard from '../components/ProfileCard'
// import { useState } from "react";
import classes from '../styles/profile.module.scss'

export default function ProfilePage(){
  const { session } = useSession()
  const user = getUser(session.id)
  console.log(user)
  // const { getUser, user } = useUsers()
  // useEffect(() => {
  //   if (session) 
  // }, [session]) getUser(session.id)

  const formatProfile = (user) => {
    let entries = Object.entries({...user})
    entries = entries.filter(([name,]) => name !== 'solvency')
    return Object.fromEntries(entries.map(([name, value]) => {
      console.log(value)
      return [name, value]
    }))
  }

  return <main className={classes.profilePage}>
    <ProfileCard profile={formatProfile(user)}/>
  </main>
}