import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PlayerProfile from '../pages/PlayerProfile';
import MountainMap from '../pages/MountainMap';
import TestModule from '../pages/TestModule';
import ResultsPage from '../pages/ResultsPage';
import FinalPage from '../pages/FinalPage';
import Login from '../pages/Login';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from '../pages/AdminDashboard';
import UserHome from '../pages/UserHome';
import Configuracion from '../pages/Configuracion'; 
import AcercaDe from '../pages/AcercaDe'
import ParadaPage from '../pages/ParadaPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/inicio" element={
      <PrivateRoute>
        <UserHome />
      </PrivateRoute>
    } />
    <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={['player']}>
            <PlayerProfile />
          </PrivateRoute>
        }
      />
    <Route
        path="/mapa"
        element={
          <PrivateRoute allowedRoles={['player']}>
            <MountainMap />
          </PrivateRoute>
        }
      />
    <Route
        path="/resultados"
        element={
          <PrivateRoute allowedRoles={['player']}>
            <ResultsPage />
          </PrivateRoute>
        }
      />
    <Route
        path="/cuestionario/:cuestionarioId/pregunta-id/:preguntaId"
        element={
          <PrivateRoute allowedRoles={['player']}>
            <ParadaPage />
          </PrivateRoute>
        }
      />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/Configuracion" element={<Configuracion />} />
  </Routes>
);
export default AppRouter;
