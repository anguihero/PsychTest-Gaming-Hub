import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';  // ✅ Asegúrate que esta ruta sea correcta

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(GameContext); // ✅ Aquí se inyecta el contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Usuario o contraseña incorrectos');

      const data = await res.json();
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('role', data.role);

      // ✅ Invoca login del contexto para guardar player.name
      login(username);

      console.log("✅ Login exitoso:", data);
      navigate('/inicio');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f9fc',
        flexDirection: 'column',
        padding: '2rem',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Iniciar sesión</h1>

      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '300px',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
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
        <button
          type="submit"
          style={{ backgroundColor: '#2490e9', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px' }}
        >
          Entrar
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
