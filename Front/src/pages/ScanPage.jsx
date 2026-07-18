import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import classes from '../styles/scan.module.scss'
import useScanner from '../hooks/useScanner'
import { useSession } from '../hooks/useSession'
import useUsers from '../hooks/useUsers'
import { useModalForm } from '../hooks/useModalForm'

export function ScanPage(){
  const navigate  = useNavigate()
  const { session } = useSession()
   const { profile, getProfile, } = useUsers()
   const video = useRef()
   const {modal, modalOpen, formInfo, showModalForm, closeModalForm} = useModalForm()
   
   const handleScanSuccess = (data) => {
     if (!profile) return
     const [prefix, id] = data.split(':')
     const solvency = profile.solvency
     if (solvency) {
       showModalForm({text: `Disculpe, ${profile.name} pero usted no puede hacer uso del bot asistente debido a que se encuentra insolvente`})
      return 
    } 
    if (prefix == 'ss25') {
      navigate("/chat", { state: { machine: id } })
    } else showModalForm({text: 'QR no valido'})
  }
  const { startWebcam, stopScan } = useScanner(video, handleScanSuccess)
  
  const goToPayment = () => {
    stopScan()
    navigate('/profile', {state: { mode: 'payments', modal: 'payments'}})
  }

  useEffect(() => {
    if (session) getProfile()
  }, [session]) 


  startWebcam()

  return<>
    <main className={classes.scanPage}>
      <video ref={video} autoPlay muted playsInline />
      <div className={classes.framing}>
        { 
          Array.from(Array(25).keys()).map((number) => {
            const filledCells = [0,1,3,4,5,9,15,19,20,21,23, 24] 
            const className = filledCells.includes(number) 
              ? classes.filled : ''
            return <span className={className}></span>
          }) 
        }
      </div>
    </main>
   {(profile && modalOpen)  && <dialog className={classes.modal} ref={modal} open={modalOpen}>
     <button className='closeBtn' onClick={() => closeModalForm()}>X</button>
      <p>{formInfo.title}</p>
      <button onClick={goToPayment}>Ir a Pagar</button>
    </dialog>}
  </>
}

export default ScanPage