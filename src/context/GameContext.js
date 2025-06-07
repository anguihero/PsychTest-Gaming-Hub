import { createContext, useState, useEffect } from 'react';

const storedPlayer = localStorage.getItem('player');
const storedProgress = localStorage.getItem('progress');
const storedResults = localStorage.getItem('results');

const initialPlayer = storedPlayer ? JSON.parse(storedPlayer) : null;
const initialProgress = storedProgress ? JSON.parse(storedProgress) : [];
const initialResults = storedResults ? JSON.parse(storedResults) : [];

export const GameContext = createContext();

export const GameProvider = ({ children }) => {


const [player, setPlayer] = useState(window.__INITIAL_STATE__?.player || null);
const [progress, setProgress] = useState(window.__INITIAL_STATE__?.progress || []);
const [results, setResults] = useState(window.__INITIAL_STATE__?.results || []);

useEffect(() => {
  localStorage.setItem('player', JSON.stringify(player));
}, [player]);

useEffect(() => {
  localStorage.setItem('progress', JSON.stringify(progress));
}, [progress]);

useEffect(() => {
  localStorage.setItem('results', JSON.stringify(results));
}, [results]);