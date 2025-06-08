import React from 'react';

const AcercaDe = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Acerca del Proyecto</h2>
      <p style={styles.text}>
        Este juego fue creado como una herramienta educativa y psicológica que combina el formato
        de pruebas tipo test con una aventura interactiva de escalada al Everest. Cada reto ayuda
        a conocer mejor tus habilidades, toma de decisiones y estrategias de pensamiento.
      </p>
      <div style={styles.videoWrapper}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/Og-Y040viXA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1.5rem',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  text: {
    fontSize: '1rem',
    lineHeight: '1.5',
    textAlign: 'justify',
    marginBottom: '1.5rem',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    height: 0,
    overflow: 'hidden',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};

export default AcercaDe;
