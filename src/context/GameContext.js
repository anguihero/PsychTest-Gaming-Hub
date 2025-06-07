import { createContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('player', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('results', JSON.stringify(results));
  }, [results]);

  const login = (name) => {
    setPlayer({ name, avatar: null, stats: { fuerza: 0, resistencia: 0, velocidad: 0 } });
  };

  const updateProfile = (avatar, stats) => {
    setPlayer((prev) => ({ ...prev, avatar, stats }));
  };

  const completeTest = (testId, score, summary) => {
    setProgress((prev) => [...prev, testId]);
    setResults((prev) => [...prev, { testId, score, summary }]);
  };

  return (
    <GameContext.Provider value={{ player, login, updateProfile, progress, results, completeTest }}>
      {children}
    </GameContext.Provider>
  );
};
