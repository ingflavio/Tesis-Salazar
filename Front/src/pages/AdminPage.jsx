import { useNavigate } from "react-router";

export default function AdminPage() { 
  const navigate = useNavigate()
  
  return (
    <nav>
      <button onClick={() => navigate('table')}> 
          Tabla de usuarios
      </button>
    </nav>
  );
}
