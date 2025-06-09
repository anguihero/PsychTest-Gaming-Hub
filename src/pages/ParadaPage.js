import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import '../styles/Parada.css';

const ParadaPage = () => {
  const { cuestionarioId, preguntaId } = useParams();
  const navigate = useNavigate();
  const { completeTest } = useContext(GameContext);

  const [data, setData] = useState(null);
  const [tiempo, setTiempo] = useState(30);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  // 🔄 Cargar pregunta actual
  useEffect(() => {
    fetch(`http://localhost:8000/cuestionario/${cuestionarioId}/pregunta-id/${preguntaId}`)
      .then(res => {
        if (!res.ok) throw new Error("Pregunta no encontrada");
        return res.json();
      })
      .then(data => {
        setData(data);
        setTiempo(30); // ✅ reinicia tiempo cada vez que cambia pregunta
        setRespuestaSeleccionada(null); // ✅ limpia respuesta
      })
      .catch(() => {
        alert("✅ Cuestionario completado.");
        completeTest(parseInt(cuestionarioId), 100, 'Finalizado');
        navigate('/inicio'); // ✅ volver a ruta de cuestionarios
      });
  }, [cuestionarioId, preguntaId, navigate, completeTest]);

  // ⏱ Timer de 30 segundos
  useEffect(() => {
    if (tiempo === 0) {
      pasarSiguiente();
      return;
    }

    const timer = setTimeout(() => setTiempo(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tiempo]);

  // 👉 Avanzar a la siguiente pregunta
  const pasarSiguiente = () => {
    const siguientePregunta = parseInt(preguntaId) + 1;
    navigate(`/cuestionario/${cuestionarioId}/pregunta-id/${siguientePregunta}`);
  };

  const seleccionarRespuesta = (index) => {
    setRespuestaSeleccionada(index);
    setTimeout(pasarSiguiente, 1000); // ✅ avanza tras 1 seg
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="parada-container">
      <h2>{data.cuestionario.titulo}</h2>
      <div className="timer">⏱ {tiempo}s</div>

      <div className="pregunta-box">
        <h3>{data.pregunta.texto}</h3>
        <p>{data.pregunta.pista}</p>
      </div>

      <div className="opciones-grid">
        {data.respuestas.map((resp, i) => (
          <button
            key={i}
            className={`opcion ${respuestaSeleccionada === i ? 'seleccionada' : ''}`}
            onClick={() => seleccionarRespuesta(i)}
            disabled={respuestaSeleccionada !== null}
          >
            {resp.texto}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ParadaPage;
