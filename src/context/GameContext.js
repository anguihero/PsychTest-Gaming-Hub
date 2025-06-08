import { createContext, useState, useEffect } from 'react';

// Intentar leer desde localStorage
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

  // Sincroniza player con localStorage
  useEffect(() => {
    if (player) {
      localStorage.setItem('player', JSON.stringify(player));
      localStorage.setItem('username', player.name);  // sincroniza username aparte
    }
  }, [player]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  // ✅ Login: recibe un nombre y crea un jugador básico
  const login = (name) => {
    setPlayer({ name, avatar: null, stats: { fuerza: 0, resistencia: 0, velocidad: 0 } });
  };

  // ✅ Actualiza perfil (avatar y stats)
  const updateProfile = (avatar, stats) => {
    setPlayer((prev) => ({ ...prev, avatar, stats }));
  };

  // ✅ Guarda test completado
  const completeTest = (testId, score, summary) => {
    setProgress((prev) => [...prev, testId]);
    setResults((prev) => [...prev, { testId, score, summary }]);
  };

  // ✅ Resetea todo
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
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
