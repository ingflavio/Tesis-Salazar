import jsQR from "jsqr";

export function useScanner(videoPlayer, onScanSuccess) {
  let canvas = null;
  let stream = null;
  let scanInterval = null;

  function scanFrame() {
    const video = videoPlayer.current;
    
    if (!video) {
      return;
    }

    // Verificar que el canvas exista
    if (!canvas) {
      return;
    }

    // Verificar dimensiones válidas del video
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

    try {
      console.log('Escaneando...');
      
      // Actualizar dimensiones del canvas si es necesario
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log(`Canvas redimensionado a: ${canvas.width}x${canvas.height}`);
      }

      const context = canvas.getContext('2d');
      
      // Verificar que el contexto se haya obtenido correctamente
      if (!context) {
        return;
      }

      // Dibujar el frame actual del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Obtener los datos de la imagen
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      console.log('Decodificando QR...');
      
      // Intentar decodificar el código QR
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      
      if (code) {
        // QR detectado exitosamente
        console.log('¡QR detectado!');
        if (onScanSuccess) {
          onScanSuccess(code.data);
        }
        stopWebcam();
      } 
      
    } catch (error) {
      console.log(`Error durante el escaneo: ${error.message}`);
    }
  }

  async function startWebcam() {
    try {
      // Limpiar interval anterior si existe
      if (scanInterval) {
        clearInterval(scanInterval);
        scanInterval = null;
      }

      stream = await window.navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" },
        audio: false
      });
      
      console.log("Webcam iniciada correctamente");
      videoPlayer.current.srcObject = stream;

      // Esperar a que el video esté listo antes de empezar a escanear
      videoPlayer.current.onloadedmetadata = () => {
        console.log("Video cargado, dimensiones:", {
          width: videoPlayer.current.videoWidth,
          height: videoPlayer.current.videoHeight
        });
        
        // Inicializar canvas después de que el video tenga dimensiones
        canvas = document.createElement('canvas');
        canvas.width = videoPlayer.current.videoWidth;
        canvas.height = videoPlayer.current.videoHeight;
        
        // Comenzar a escanear una vez por segundo
        scanInterval = setInterval(() => {
          scanFrame();
        }, 500); // Escanea cada segundo
        
        // Realizar un escaneo inmediato
        scanFrame();
      };
        
    } catch (error) {
      console.log(`Error al iniciar webcam: ${error.message}`);
    }
  }

  function stopWebcam() {
    // Detener el intervalo de escaneo
    if (scanInterval) {
      clearInterval(scanInterval);
      scanInterval = null;
      console.log("Intervalo de escaneo detenido");
    }
    
    // Detener los tracks de la cámara
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoPlayer.current) {
        videoPlayer.current.srcObject = null;
      }
      stream = null;
      console.log("Webcam detenida");
    }
    
    // Limpiar canvas
    canvas = null;
  }

  return { startWebcam, stopScan: stopWebcam };
}

export default useScanner;