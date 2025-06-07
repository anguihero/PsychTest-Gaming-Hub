import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const FinalPage = () => {
  const { player, results } = useContext(GameContext);

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
    </div>
  );
};

export default FinalPage;