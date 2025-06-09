import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';

const PlayerProfile = () => {
  const { player } = useContext(GameContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!player?.name) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/avatar-profile/${player.name}`);
        if (!res.ok) throw new Error('No se pudo cargar el perfil del avatar');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [player]);

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page" style={{ padding: '1rem' }}>

      <h2>Perfil del Jugador: {player?.name}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        {player?.avatar && (
          <img
            src={`/avatars/${player.avatar}.png`}
            alt="Avatar"
            style={{ width: '120px', height: '120px' }}
          />
        )}
      </div>

      <div className="stats-view" style={{ marginBottom: '2rem' }}>
        {stats ? (
          Object.entries(stats).map(([key, value]) => (
            <div key={key} style={{ margin: '0.5rem 0' }}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</strong> {value}
            </div>
          ))
        ) : (
          <p>No se encontraron características.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
