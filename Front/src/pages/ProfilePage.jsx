import { useEffect } from "react";
import { useSession } from "../hooks/useSession"
import useUsers from "../hooks/useUsers";
import ProfileCard from '../components/ProfileCard'
import classes from '../styles/profile.module.scss'

export default function ProfilePage(){
  const { session } = useSession()
  const { user, getUser, refetchUser, editProfile } = useUsers()

  const editUserProfile = async (data) => {
    const response = await editProfile(data)
    console.log(response)
    refetchUser(session.id)
  }

  useEffect(() => {
    if (session) getUser(session.id)
  }, [session]) 

  // const capitalize = (text)

  const formatProfile = (user) => {
    let entries = Object.entries({...user})
    entries = entries.filter(([name,]) => name !== 'solvency')
    return Object.fromEntries(entries)
  }

  return <main className={classes.profilePage}>
    <ProfileCard profile={formatProfile(user)} editCallback={editUserProfile}/>
  </main>
}