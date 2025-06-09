import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import '../styles/MountainMap.css';
import everestImage from '../assets/img/everest_002.png';

const MountainMap = () => {
  const { progress } = useContext(GameContext);
  const navigate = useNavigate();

  // Asociar cada reto con su cuestionario correspondiente
  const cuestionarioIds = [1, 2, 3, 4, 5];  // Reto 1 a 5

  const handleSelectChallenge = (index) => {
    const cuestionarioId = cuestionarioIds[index];
    const preguntaId = 1; // Siempre iniciamos por la primera pregunta

    if (index === 0 || progress.includes(index - 1)) {
      navigate(`/cuestionario/${cuestionarioId}/pregunta-id/${preguntaId}`);
    } else {
      alert('Primero debes completar el reto anterior.');
    }
  };

  const stops = [
    { top: '85%', left: '17%' },  // Inicio
    { top: '75%', left: '55%' },  // Reto 1
    { top: '62%', left: '30%' },  // Reto 2
    { top: '50%', left: '65%' },  // Reto 3
    { top: '38%', left: '35%' },  // Reto 4
    { top: '26%', left: '67%' },  // Reto 5
    { top: '13%', left: '85%' }   // Meta
  ];

  return (
    <div className="mountain-container">
      <img src={everestImage} alt="Montaña" className="mountain-image" />

      {/* Inicio con etiqueta */}
      <div className="stop-con-etiqueta" style={{ top: '82%', left: '15%' }}>
        <div className="etiqueta derecha">Inicio</div>
        <div className="stop inicio">⛺</div>
      </div>

      {/* Retos intermedios */}
      {stops.slice(1, 6).map((pos, i) => (
        <div
          key={i}
          className={`stop intermedia ${progress.includes(i) ? 'completado' : ''}`}
          style={pos}
          onClick={() => handleSelectChallenge(i)}
        >
          <button disabled={i > 0 && !progress.includes(i - 1)}>R{i + 1}</button>
          📍
        </div>
      ))}

      {/* Meta con etiqueta */}
      <div className="stop-con-etiqueta" style={{ top: '12%', left: '85%' }}>
        <div className="etiqueta izquierda">Meta</div>
        <div className="stop final">🏁</div>
      </div>

      {/* Ruta punteada con SVG */}
      <svg className="ruta-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="
            M17,85
            C30,82 50,78 55,75
            S32,65 30,62
            S60,55 65,50
            S37,42 35,38
            S65,30 67,26
            S82,18 85,13
          "
          fill="none"
          stroke="red"
          strokeDasharray="5,5"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export default MountainMap;
