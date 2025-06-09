import React, { useState, useContext } from 'react';
import { FaCog, FaSignOutAlt, FaUser, FaBrain, FaChartBar, FaInfoCircle, FaRegLightbulb, FaBookOpen, FaMapSigns   } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import PlayerProfile from './PlayerProfile';
import MountainMap from './MountainMap';
import ResultsPage from './ResultsPage';
import AcercaDe from '../pages/AcercaDe'

const UserHome = () => {
  const { player } = useContext(GameContext);
  const navigate = useNavigate();
  const [view, setView] = useState('home');

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
      case 'acerca':
        return <AcercaDe />;
      default:
        return <p>Selecciona una opción abajo</p>;
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
      {/* Iconos superiores */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem' }}>
        <FaCog size={22} style={{ cursor: 'pointer' }} onClick={() => navigate('/configuracion')} />
        <FaSignOutAlt size={22} style={{ cursor: 'pointer' }} onClick={handleLogout} />
      </div>

      {/* Avatar + Nombre */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={avatarPath}
          alt="avatar"
          style={{ width: '120px', borderRadius: '50%' }}
        />
        <h2 style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{username}</h2>
        <p>¡Bienvenido de nuevo!</p>
      </div>

      {/* Pestañas/tabbox */}
      <div style={{ display: 'flex', gap: '1.5rem', borderBottom: '2px solid #ddd', marginBottom: '1rem' }}>
        <button
          style={{ ...tabButtonStyle, ...(view === 'acerca' ? activeTabStyle : {}) }}
          onClick={() => setView('acerca')}
        >
          <FaInfoCircle style={{ marginRight: '0.5rem' }} />
          Acerca de
        </button>
        <button
          style={{ ...tabButtonStyle, ...(view === 'perfil' ? activeTabStyle : {}) }}
          onClick={() => setView('perfil')}
        >
          <FaUser style={{ marginRight: '0.5rem' }} />
          Mi Perfil
        </button>
        <button
          style={{ ...tabButtonStyle, ...(view === 'mapa' ? activeTabStyle : {}) }}
          onClick={() => setView('mapa')}
        >
          <FaMapSigns style={{ marginRight: '0.5rem' }} />
          Ruta
        </button>
        <button
          style={{ ...tabButtonStyle, ...(view === 'resultados' ? activeTabStyle : {}) }}
          onClick={() => setView('resultados')}
        >
          <FaChartBar style={{ marginRight: '0.5rem' }} />
          Logros
        </button>
      </div>

      {/* Contenido dinámico según pestaña */}
      <div style={{ width: '100%', maxWidth: '800px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

const tabButtonStyle = {
  padding: '0.6rem 1.2rem',
  fontSize: '1rem',
  border: '1px solid transparent',
  borderRadius: '6px',
  backgroundColor: '#ffffff',
  color: '#333',
  cursor: 'pointer',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
};

const activeTabStyle = {
  backgroundColor: '#2490e9',
  color: 'white',
  border: '1px solid #2490e9',
};

export default UserHome;
