import { useState } from 'react';
import { useSession } from '../hooks/useSession';
import { useNavigate } from 'react-router';
import RoundField from '../components/RoundField';
import classes from '../styles/login.module.scss';

export function LoginPage() {
  const { login, user } = useSession(); 
  const navigate = useNavigate();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');

    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('password');

    // Validación básica
    if (!id || !password) {
      setLocalError('Por favor completa todos los campos');
      return;
    }

    const result = await login(Number(id), password);

    if (!result.success) {
      setLocalError(result.error || 'Error al iniciar sesión');
    }
    // Si success es true, el Provider ya redirige
  };

  // Si ya hay sesión, redirigir (opcional)
  if (user?.token) {
    navigate('/');
    return null;
  }

  return (
    <main className={classes.loginPage}>
      <h1>Aplicacion de gimnasio</h1>
      <form className={classes.formLogin} onSubmit={handleSubmit}>
        <h3>Inicia sesión</h3>
        <RoundField name="id" label="Cédula" />
        <RoundField name="password" label="Contraseña" type="password" />
        
        {(localError || user?.error) && (
          <span className="error-msg">{localError || user.error}</span>
        )}
        
        <button type="submit" disabled={user?.loading}>
          {user?.loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  );
}