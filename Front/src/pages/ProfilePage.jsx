// ProfilePage.jsx
import { useEffect, useState } from "react";
import { useSession } from "../hooks/useSession"
import useUsers from "../hooks/useUsers";
import { useModalForm } from "../hooks/useModalForm";
import ProfileCard from '../components/ProfileCard'
import classes from '../styles/profile.module.scss'
import PaymentsForm from "../components/PaymentForm";
import { fieldsConfig } from "../utils/fieldsConfig";
import { useLocation } from "react-router";

export default function ProfilePage(){
  const { session, logOut } = useSession()
  const location = useLocation()
  const { profile, getProfile, editProfile } = useUsers()
  const { modal, showModalForm, closeModalForm } = useModalForm()
  const [alert, setAlert] = useState('')

  const showAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => setAlert(''), 3000)
    getProfile()
  }

  const editUserProfile = async (data) => {
    const fullData = { ...data };
    for (const key in profile) {
      if (!(key in fullData)) {
        fullData[key] = profile[key];
      }
    }
    const response = await editProfile(fullData)
    if (typeof response === 'object'){
      showAlert('Usuario Actualizado')
    }
  }
    useEffect(() => {
    if (location.state?.modal) {
      const timer = setTimeout(() => {
        showModalForm({text:'Registrar Pago', sumbit:'Registrar', rol:'user'})
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, showModalForm])

  useEffect(() => {
    if (session) getProfile()
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
    <ProfileCard profile={formatProfile(profile)} 
      editCallback={editUserProfile}
      modalCallback={showModalForm}
    />
    {
      alert !== '' && 
        <span className={classes.alertBubble}>
          {alert}
        </span>
    }
    <dialog ref={modal}>
      <button className="closeBtn" onClick={() => closeModalForm()}>X</button>
      <PaymentsForm alertCallback={(msg, succes) => {
        showAlert(msg)
        if (succes) closeModalForm()
      }}/>
    </dialog>
  </main>
}