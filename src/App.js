import './styles/global.css';
import { GameProvider } from './context/GameContext';
import AppRouter from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
