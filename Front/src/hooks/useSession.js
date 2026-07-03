import { useContext } from "react";
import { sessionContext } from "../context/session"; // Asegura la ruta

export const useSession = () => {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return context;
};