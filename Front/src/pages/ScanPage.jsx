import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import classes from '../styles/scan.module.scss'
import useScanner from '../hooks/useScanner'
import { useSession } from '../hooks/useSession'
import useUsers from '../hooks/useUsers'
import { useModalForm } from '../hooks/useModalForm'

export function ScanPage(){
  const { session } = useSession()
  const { user, getUser } = useUsers()
  const {modal, modalOpen, showModalForm, closeModalForm} = useModalForm()
  const video = useRef()
  const navigate = useNavigate()

  const handleScanSuccess = (data) => {
    if (!user) return
    const [prefix, id] = data.split(':')
    const solvency = false /*user.solvency*/
    if (!solvency) {
      showModalForm({})
      return 
    } 
    if (prefix == 'ss25') navigate("/chat", { state: { machine: id } });
  }

  useEffect(() => {
    if (session) getUser(session.id)
  }, [session]) 

  const { startWebcam } = useScanner(video, handleScanSuccess)

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
   {modalOpen&& <dialog ref={modal} open={modalOpen}>
        <h3>PAGUE LOS MALDITOS RIALES </h3>
    </dialog>}
  </>
}

export default ScanPage