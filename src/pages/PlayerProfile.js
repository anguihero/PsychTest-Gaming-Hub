import { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import AvatarSelector from '../components/AvatarSelector';
import { useNavigate } from 'react-router-dom';

const PlayerProfile = () => {
  const { player, updateProfile } = useContext(GameContext);
  const [selectedAvatar, setSelectedAvatar] = useState(player?.avatar || null);
  const [stats, setStats] = useState(player?.stats || { fuerza: 0, resistencia: 0, velocidad: 0 });
  const navigate = useNavigate();

  const handleSave = () => {
    updateProfile(selectedAvatar, stats);
    navigate('/mapa');
  };

  const handleChangeStat = (key, value) => {
    setStats((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  return (
    <div className="profile-page">
      <h2>Perfil del Jugador: {player?.name}</h2>
      <AvatarSelector selected={selectedAvatar} onSelect={setSelectedAvatar} />
      <div className="stats-form">
        <label>Fuerza: <input type="number" value={stats.fuerza} onChange={(e) => handleChangeStat('fuerza', e.target.value)} /></label>
        <label>Resistencia: <input type="number" value={stats.resistencia} onChange={(e) => handleChangeStat('resistencia', e.target.value)} /></label>
        <label>Velocidad: <input type="number" value={stats.velocidad} onChange={(e) => handleChangeStat('velocidad', e.target.value)} /></label>
      </div>
      <button onClick={handleSave}>Guardar y continuar</button>
    </div>
  );
};

export default PlayerProfile;
