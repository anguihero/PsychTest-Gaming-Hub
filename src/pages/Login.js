import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();

      // Guardar datos en localStorage
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('role', data.role);

      // Redirigir según rol
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
