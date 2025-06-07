
import { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useContext(GameContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate('/perfil');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Bienvenido al Reto Everest</h2>
      <input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Iniciar Aventura</button>
    </form>
  );
};

export default LoginForm;