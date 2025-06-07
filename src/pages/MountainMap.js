import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

const MountainMap = () => {
  const { progress } = useContext(GameContext);
  const navigate = useNavigate();
  const totalChallenges = 5; // ejemplo fijo

  const handleSelectChallenge = (index) => {
    if (index === totalChallenges - 1 && progress.includes(index - 1)) {
      navigate('/final');
      return;
    }

    if (index === 0 || progress.includes(index - 1)) {
      navigate(`/reto/${index}`);
    } else {
      alert('Primero debes completar el reto anterior.');
    }
  };


  return (
    <div className="mountain-map">
      <h2>Ruta del Everest</h2>
      <ul>
        {[...Array(totalChallenges)].map((_, index) => (
          <li key={index}>
            <button onClick={() => handleSelectChallenge(index)} disabled={index > 0 && !progress.includes(index - 1)}>
              {progress.includes(index) ? '✅' : '🔒'} Reto {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MountainMap;