import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/logout';

const ResultsPage = () => {
  const { results } = useContext(GameContext);
  const navigate = useNavigate();

  return (
    <div className="results-page">
      <h2>Historial de Resultados</h2>
      {results.length === 0 ? (
        <p>Aún no has completado ningún reto.</p>
      ) : (
        <ul>
          {results.map((r, idx) => (
            <li key={idx}>
              <strong>Reto {r.testId + 1}:</strong> {r.score}% - {r.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
