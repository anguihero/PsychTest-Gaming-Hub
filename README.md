# 🧠⛰️ EverMind Route

**EverMind Route** es un juego educativo y motivacional en formato web, diseñado para simular una travesía de escalada al Everest, en la que un único jugador supera retos tipo test secuenciales. Cada reto representa un paso más hacia la cumbre del éxito personal, profesional y mental. La app fusiona conceptos de psicología, gamificación y superación en un desarrollo modular hecho con React.

---

## 🎯 Objetivo del Proyecto

El objetivo principal de EverMind Route es **inspirar la autosuperación y el aprendizaje progresivo**, representando el camino hacia metas personales o laborales como una serie de desafíos intelectuales.

Mediante la resolución de tests interactivos, los usuarios entrenan su autoconocimiento, resiliencia y habilidades cognitivas, subiendo simbólicamente hasta alcanzar la cumbre del Everest: un estado de realización personal.

---

## 🔄 Flujo del Jugador

1. **Inicio de sesión personalizado**

   * El jugador se identifica con su nombre.

2. **Perfil de jugador**

   * Selección de avatar.
   * Personalización de características como escalador: fuerza, resistencia y velocidad.

3. **Ruta de montaña**

   * Visualización de los retos disponibles en formato de ascenso.
   * Solo se puede avanzar si se completó el reto anterior.

4. **Módulo de Test**

   * Preguntas de opción múltiple.
   * Evaluación automática y resumen textual del desempeño.

5. **Historial de Resultados**

   * Visualización de todas las puntuaciones y feedback recibido.

6. **Final del Juego**

   * Al superar todos los retos, el jugador alcanza la cima y recibe una felicitación con resumen general de su travesía mental.

---

## 🧩 Estructura de Carpetas

```
src/
├── assets/              # Recursos (avatares)
├── components/          # Componentes reutilizables
├── context/             # Estado global (GameContext)
├── data/                # Preguntas y avatares en JSON
├── pages/               # Vistas del juego
├── routes/              # Navegación con React Router
├── styles/              # Estilos globales CSS
├── utils/               # Funciones auxiliares como scoreAnalyzer
├── App.js               # Punto de entrada con GameProvider
└── index.js             # Render de ReactDOM
```

---

## ⚙️ Funcionalidades Técnicas

* **React + React Router v6** para navegación tipo SPA.
* **Context API** para manejar:

  * Sesión del jugador
  * Progreso en la montaña
  * Resultados históricos
* **Persistencia automática con `localStorage`**:

  * Estado guardado automáticamente entre sesiones.
* **Diseño modular y componentes reutilizables.**
* **Estilos limpios y responsivos** con CSS personalizado.

---

## 📁 Archivos de Datos

* `data/avatars.json`: lista de avatares con `id`, `name` e `image`.
* `data/questions.json`: estructura de retos con:

  ```json
  [
    {
      "title": "Reto 1",
      "questions": [
        {
          "question": "¿Cuál es la montaña más alta del mundo?",
          "options": ["Everest", "K2", "Makalu"],
          "answer": "Everest"
        }
      ]
    }
  ]
  ```

---

## 📦 Dependencias

```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.1",
  "react-scripts": "5.0.1"
}
```

Instalación:

```bash
npm install
```

---

## 🚀 Scripts disponibles

```bash
npm start       # Ejecuta la app en modo desarrollo
npm run build   # Genera build de producción
npm test        # Corre los tests (si se implementan)
```

---

## 📌 Recomendaciones Técnicas

* El juego está pensado para **un solo jugador por sesión**.
* El progreso está limitado a la lógica secuencial (no se puede saltar retos).
* Para reiniciar el juego desde cero, **borrar el localStorage manualmente**.
* Las imágenes deben estar en `public/assets/avatars/` o cargadas vía import.

---

## 🌱 Ideas para Futuras Mejoras

* Integración con backend y base de datos de usuarios.
* Incorporar niveles de dificultad adaptativa.
* Sistema de logros y medallas.
* Retroalimentación personalizada con IA.
* Rankings entre jugadores y progreso compartido.

---

## 👩‍💻 Autoría y Propósito

Este proyecto fue creado como una herramienta lúdica para el desarrollo personal y profesional, usando tecnologías modernas del ecosistema React. **EverMind Route** combina diseño modular, gamificación y psicología para ofrecer una experiencia significativa de autoevaluación y motivación.

---

¡Gracias por escalar con EverMind Route! 🧗‍♂️🚀
