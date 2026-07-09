// ProfilePage.jsx
import { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession"
import useUsers from "../hooks/useUsers";
import { useModalForm } from "../hooks/useModalForm";
import ProfileCard from '../components/ProfileCard'
import classes from '../styles/profile.module.scss'
import PaymentsForm from "../components/PaymentForm";

export default function ProfilePage(){
  const { session, logOut } = useSession()
  const { user, getUser, refetchUser, editProfile } = useUsers()
  const { modal, showModalForm, closeModalForm } = useModalForm()
  const [showAlert, setShowAlert] = useState(false)

  const editUserProfile = async (data) => {
    const response = await editProfile(data)
    if (typeof response === 'object'){
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      refetchUser(session.id)
    }
  }

  useEffect(() => {
    if (session) getUser(session.id)
  }, [session]) 

  const formatProfile = (user) => {
    let entries = Object.entries({...user})
    entries = entries.filter(([name,]) => name !== 'solvency')
    return Object.fromEntries(entries)
  }


  return <main className={classes.profilePage}>
    <button className={classes.logOut} onClick={logOut}>Cerrar Sesion</button>
    <ProfileCard profile={formatProfile(user)} 
      editCallback={editUserProfile}
      modalCallback={showModalForm}
    />
    {
      showAlert && 
        <span className={classes.alertBubble}>
          Usuario actualizado
        </span>
    }
    <dialog ref={modal}>
      <button className="closeBtn" onClick={() => closeModalForm()}>X</button>
      <PaymentsForm />
    </dialog>
  </main>
}