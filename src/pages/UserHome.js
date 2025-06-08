import React, { useState, useContext } from 'react';
import { FaCog, FaSignOutAlt, FaUser, FaBrain, FaChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import PlayerProfile from './PlayerProfile';
import MountainMap from './MountainMap';
import ResultsPage from './ResultsPage';

const UserHome = () => {
  const { player } = useContext(GameContext);
  const navigate = useNavigate();
  const [view, setView] = useState('home'); // opciones: 'home', 'perfil', 'mapa', 'resultados'

  const username = player?.name || 'Invitado';
  const avatar = player?.avatar || 'default';
  const avatarPath = require(`../assets/avatars/${avatar}.png`);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderContent = () => {
    switch (view) {
      case 'perfil':
        return <PlayerProfile />;
      case 'mapa':
        return <MountainMap />;
      case 'resultados':
        return <ResultsPage />;
      default:
        return (
          <>
            <img
              src={avatarPath}
              alt="avatar"
              style={{ width: '120px', borderRadius: '50%' }}
            />
            <h2 style={{ fontWeight: 'bold' }}>{username}</h2>
            <p>¡Bienvenido de nuevo!</p>
          </>
        );
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f9fc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Iconos de arriba */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem' }}>
        <FaCog size={22} style={{ cursor: 'pointer' }} onClick={() => navigate('/configuracion')} />
        <FaSignOutAlt size={22} style={{ cursor: 'pointer' }} onClick={handleLogout} />
      </div>

      {/* Sección central dinámica */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {renderContent()}
      </div>

      {/* Botonera solo si está en vista principal */}
      {view === 'home' && (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button style={botonEstilo} onClick={() => setView('perfil')}>
            <FaUser style={{ marginRight: '0.5rem' }} />
            Mi Perfil
          </button>
          <button style={botonEstilo} onClick={() => setView('mapa')}>
            <FaBrain style={{ marginRight: '0.5rem' }} />
            Ruta
          </button>
          <button style={botonEstilo} onClick={() => setView('resultados')}>
            <FaChartBar style={{ marginRight: '0.5rem' }} />
            Logros
          </button>
        </div>
      )}
    </div>
  );
};

const botonEstilo = {
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#2490e9',
  color: 'white',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
};

export default UserHome;
