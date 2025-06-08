import React from 'react';
import { logout } from '../utils/logout';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Panel de Administración</h1>
      <p>Bienvenido/a, administrador.</p>

      <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default AdminDashboard;
