import './styles/global.css';
import { GameProvider } from './context/GameContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <GameProvider>
      <AppRouter />
    </GameProvider>
  );
}

export default App;