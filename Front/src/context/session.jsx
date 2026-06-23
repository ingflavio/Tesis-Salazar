import { createContext, useReducer } from "react";
import { initialState, reducerUser } from "../reducers/session";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService"; // ← importa el servicio

export const userContext = createContext();

function useUserReducer() {
  const [state, dispatch] = useReducer(reducerUser, initialState);

  const login = async (id, password) => {
    // Limpiar error anterior
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await authService.login(id, password);
      const { token, cedula, rol } = response.data;

      // Guardar en el estado y localStorage
      dispatch({
        type: 'LOGIN',
        payload: { token, cedula, rol }
      });

      return { success: true, user: { cedula, rol } };
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Credenciales incorrectas';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      return { success: false, error: errorMsg };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' });
    // Opcional: notificar al backend
    // authService.logout().catch(console.error);
  };

  return { state, login, logOut };
}

export function UserProvider({ children }) {
  const { state, login, logOut } = useUserReducer();
  const navigate = useNavigate();

  // Envolvemos las funciones para añadir la redirección
  const handleLogin = async (id, password) => {
    const result = await login(id, password);
    if (result.success) {
      // Redirigir según el rol
      if (result.user.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
    return result;
  };

  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };

  return (
    <userContext.Provider value={{
      user: state,           // { token, cedula, rol, loading, error }
      login: handleLogin,
      logOut: handleLogOut,
    }}>
      {children}
    </userContext.Provider>
  );
}