import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useParams, useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';
import scoreAnalyzer from '../utils/scoreAnalyzer';

const TestModule = () => {
  const { id } = useParams();
  const { completeTest } = useContext(GameContext);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const challenge = questions[id];

  const handleSelect = (qIndex, value) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => {
    const correct = challenge.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
    const score = Math.round((correct / challenge.questions.length) * 100);
    const summary = scoreAnalyzer(score);
    completeTest(parseInt(id), score, summary);
    navigate('/resultados');
  };

  if (!challenge) return <p>Reto no encontrado</p>;

  return (
    <div className="test-module">
      <h2>{challenge.title}</h2>
      {challenge.questions.map((q, index) => (
        <div key={index} className="question-block">
          <p>{q.question}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`q${index}`}
                value={opt}
                checked={answers[index] === opt}
                onChange={() => handleSelect(index, opt)}
              /> {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar Respuestas</button>
    </div>
  );
};

export default TestModule;
