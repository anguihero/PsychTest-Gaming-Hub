import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#ccc',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '2rem'
      }}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
