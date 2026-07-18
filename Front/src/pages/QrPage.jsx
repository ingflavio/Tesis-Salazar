import { useEffect } from "react";
import { useSession } from "../hooks/useSession";
import useUsers from "../hooks/useUsers";
import classes from '../styles/scan.module.scss'
import { useNavigate } from "react-router";
import QR from '../images/Qr-Entrada.png'

export default function QrPage() {
  const navigate  = useNavigate()
 const { session } = useSession()
 const { profile, getProfile, } = useUsers()


  const goToPayment = () => {
    navigate('/profile', {state: { mode: 'payments', modal: 'payments'}})
  }

  useEffect(() => {
    if (session) getProfile()
  }, [session]) 

  if (!profile) {
    return <h3>Cargando usuario</h3>
  }
  const solvency = profile.solvency
  if (!solvency) {
    return <dialog className={classes.modal} open>
      <p>Disculpe, {profile.name || 'usuario'} pero usted no puede hacer uso del QR de entrada debido a que se encuentra insolvente</p>
      <button onClick={goToPayment}>Ir a Pagar</button>
    </dialog>
  } 

  return <main className={classes.QrPage}>
    <img src={QR} alt="QR de entrada" />
  </main>
} 