import { createContext, useState, useEffect } from 'react';

// Leer desde localStorage
const storedPlayer = localStorage.getItem('player');
const storedProgress = localStorage.getItem('progress');
const storedResults = localStorage.getItem('results');

const initialPlayer = storedPlayer ? JSON.parse(storedPlayer) : null;
const initialProgress = storedProgress ? JSON.parse(storedProgress) : [];
const initialResults = storedResults ? JSON.parse(storedResults) : [];

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(initialPlayer);
  const [progress, setProgress] = useState(initialProgress);
  const [results, setResults] = useState(initialResults);

  // Guardar en localStorage
  useEffect(() => {
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
      localStorage.setItem('username', player.name);
    }
  }, [player]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  // Login
  const login = (name) => {
    setPlayer({ name, avatar: null, stats: { fuerza: 0, resistencia: 0, velocidad: 0 } });
  };

  // Actualizar perfil
  const updateProfile = (avatar, stats) => {
    setPlayer((prev) => ({ ...prev, avatar, stats }));
  };

  // Registrar test completado con resultado
  const completeTest = (testId, score, summary) => {
    setProgress((prev) => [...new Set([...prev, testId])]);
    setResults((prev) => [...prev, { testId, score, summary }]);
  };

  // Registrar test completado sin resultado (para navegación de montaña)
  const completeTestSimple = (testId) => {
    setProgress((prev) => [...new Set([...prev, testId])]);
  };

  // Validar si se puede acceder al reto
  const canAccessChallenge = (testId) => {
    return testId === 0 || progress.includes(testId - 1);
  };

  // Reset completo
  const resetGame = () => {
    setPlayer(null);
    setProgress([]);
    setResults([]);
    localStorage.removeItem('player');
    localStorage.removeItem('progress');
    localStorage.removeItem('results');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
  };

  return (
    <GameContext.Provider
      value={{
        player,
        login,
        updateProfile,
        progress,
        results,
        completeTest,
        completeTestSimple,
        resetGame,
        canAccessChallenge,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
