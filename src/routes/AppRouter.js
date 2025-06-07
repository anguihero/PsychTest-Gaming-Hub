import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PlayerProfile from '../pages/PlayerProfile';
import MountainMap from '../pages/MountainMap';
import TestModule from '../pages/TestModule';
import ResultsPage from '../pages/ResultsPage';
import FinalPage from '../pages/FinalPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/perfil" element={<PlayerProfile />} />
      <Route path="/mapa" element={<MountainMap />} />
      <Route path="/reto/:id" element={<TestModule />} />
      <Route path="/resultados" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/final" element={<FinalPage />} />
    </Routes>
  </Router>
);

export default AppRouter;