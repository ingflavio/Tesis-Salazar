// ProfilePage.jsx
import { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession"
import useUsers from "../hooks/useUsers";
import { useModalForm } from "../hooks/useModalForm";
import ProfileCard from '../components/ProfileCard'
import classes from '../styles/profile.module.scss'
import PaymentsForm from "../components/PaymentForm";
import { fieldsConfig } from "../utils/fieldsConfig";

export default function ProfilePage(){
  const { session, logOut } = useSession()
  const { user, getUser, editProfile } = useUsers()
  const { modal, showModalForm, closeModalForm } = useModalForm()
  const [showAlert, setShowAlert] = useState(false)

  const editUserProfile = async (data) => {
    const response = await editProfile(data)
    console.log(response)
    if (typeof response === 'object'){
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      getUser(session.id)
    }
  }

  useEffect(()=> {
    if (user) console.log("desde la pagina el numero es "+user.phone)
  }, [user])

  useEffect(() => {
    if (session) getUser(session.id)
  }, [session]) 

  const formatProfile = (user) => {
    const entries = Object.entries({...user})
    const formatedEntries = entries.reduce((newEntries, [name, value]) => {
      if(name !== 'solvency' && name !== 'rol'){
        const formatValue = fieldsConfig[name].formatValue
        const newValue = formatValue ? formatValue(value) : value
        newEntries.push([name, newValue])
      }
      return newEntries
    },[])
    return Object.fromEntries(formatedEntries)
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