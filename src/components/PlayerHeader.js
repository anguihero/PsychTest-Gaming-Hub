import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import LogoutButton from './LogoutButton';

const PlayerHeader = () => {
  const { player } = useContext(GameContext);

  if (!player) return null;

  return (
    <div style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {player.avatar && (
          <img
            src={player.avatar}
            alt="Avatar"
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
          />
        )}
        <span style={{ fontWeight: 'bold' }}>Jugador: {player.name}</span>
      </div>
      <LogoutButton />
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #ccc'
};

export default PlayerHeader;
