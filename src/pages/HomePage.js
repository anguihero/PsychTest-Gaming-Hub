import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/img/everest_002.png';

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('role');

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Bienvenido a EverMindEst Route 🏔️</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>Explora tu mente mientras escalas. Aventura psicológica en cada reto.</p>

      <button
        onClick={() => navigate(isAuthenticated ? '/inicio' : '/login')}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#2490e9',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}
      >
        {isAuthenticated ? 'Ir al menú principal' : 'Iniciar sesión'}
      </button>
    </div>
  );
};

export default HomePage;
