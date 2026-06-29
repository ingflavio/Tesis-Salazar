import { useState } from 'react';
import { useSession } from '../hooks/useSession';
import { Navigate } from 'react-router';
import RoundField from '../components/RoundField';
import classes from '../styles/login.module.scss';

export function LoginPage() {
  const { login, session } = useSession(); 
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

  if (session?.token) {
    return <Navigate to={'/admin'} />
  }

  return (
    <main className={classes.loginPage}>
      <h1>Aplicacion de gimnasio</h1>
      <form className={classes.formLogin} onSubmit={handleSubmit}>
        <h3>Inicia sesión</h3>
        <RoundField name="id" label="Cédula" />
        <RoundField name="password" label="Contraseña" type="password" />
        
        {(localError || session?.error) && (
          <span className="error-msg">{localError || session.error}</span>
        )}
        
        <button type="submit" disabled={session?.loading}>
          {session?.loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  );
}