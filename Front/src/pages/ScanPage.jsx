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

  const { startWebcam } = useScanner(video, handleScanSuccess)

  startWebcam()

  return(
    <main className={classes.scanPage}>
      <video ref={video} autoPlay muted playsInline></video>
      <div>
        { 
          Array.from(Array(25).keys()).map((number) => {
            console.log('uwu')
            const filledCells = [0,1,3,4,5,9,15,19,20,21,23, 24] 
            const className = filledCells.includes(number) 
              ? classes.filled : ''
            return <span className={className}></span>
          }) 
        }
      </div>
    </main>
  )
}

export default ScanPage