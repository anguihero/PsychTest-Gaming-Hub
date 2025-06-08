import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import AvatarSelector from '../components/AvatarSelector';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';

const PlayerProfile = () => {
  const { player, updateProfile } = useContext(GameContext);
  const [selectedAvatar, setSelectedAvatar] = useState(player?.avatar || null);
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

  const handleChangeStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSave = () => {
    updateProfile(selectedAvatar, stats);
    navigate('/inicio');
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <h2>Perfil del Jugador: {player?.name}</h2>
      <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
      <div className="stats-form">
        {stats ? (
          Object.entries(stats).map(([key, value]) => (
            <label key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:
              <input
                type="number"
                value={value}
                onChange={(e) => handleChangeStat(key, e.target.value)}
              />
            </label>
          ))
        ) : (
          <p>Cargando características del perfil...</p>
        )}
      </div>
      <button onClick={handleSave}>Guardar y continuar</button>
      <button onClick={() => logout(navigate)} style={{ marginTop: '1rem' }}>Cerrar sesión</button>
    </div>
  );
};

export default PlayerProfile;
