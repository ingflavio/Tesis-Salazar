import { useRef } from 'react'
import classes from '../styles/scan.module.scss'
import useScanner from '../hooks/useScanner'
// import useScanner from '../hooks/useScanner'

export function ScanPage(){
  const video = useRef()

  const handleScanSuccess = (data) => {
   alert(data)
   console.log(data)
  }

  const {startWebcam, stopsCanner} = useScanner(video, handleScanSuccess)

  startWebcam()

  return(
    <main className=''>
      <video ref={video} autoPlay muted playsInline></video>
      <button onChange={stopsCanner}>stop</button>
      <p></p>
    </main>
  )
}

export default ScanPage