// hooks/useUser.js
import { useContext } from "react";
import { userContext } from "../context/session"; // Asegura la ruta

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};