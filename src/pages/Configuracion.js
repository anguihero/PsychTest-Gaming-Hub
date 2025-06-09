import React from 'react';
import { useNavigate } from 'react-router-dom';

const Configuracion = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Configuración</h2>
      <p style={styles.description}>Aquí puedes ajustar tu experiencia en el juego.</p>

      <ul style={styles.list}>
        <li>⚙️ Cambiar idioma (próximamente)</li>
        <li>🔊 Ajustar sonido (próximamente)</li>
        <li>🗑️ Restablecer progreso (próximamente)</li>
        <li>🧑‍💻 Créditos y versión</li>
      </ul>

      <button onClick={() => navigate(-1)} style={styles.button}>
        Volver
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '2rem auto',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
  },
  list: {
    textAlign: 'left',
    paddingLeft: '1.5rem',
    marginBottom: '2rem',
    lineHeight: '1.8rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2490e9',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Configuracion;
