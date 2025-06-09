import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';

const FinalPage = () => {
  const { player, results } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div className="final-page">
      <h2>¡Felicidades {player.name}, has llegado a la cima del Everest! 🏔️</h2>
      <p>Resumen de tu desempeño:</p>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            <strong>Reto {r.testId + 1}:</strong> {r.score}% - {r.summary}
          </li>
        ))}
      </ul>
      <p>¡Gracias por jugar!</p>

      <button onClick={() => logout(navigate)} style={{ marginTop: '2rem' }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default FinalPage;
