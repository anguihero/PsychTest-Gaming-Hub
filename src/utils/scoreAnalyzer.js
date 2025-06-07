const scoreAnalyzer = (score) => {
  if (score === 100) return '¡Desempeño perfecto! Gran trabajo.';
  if (score >= 80) return 'Muy buen desempeño, sigue así.';
  if (score >= 60) return 'Buen intento, puedes mejorar en precisión.';
  if (score >= 40) return 'Necesitas más práctica y concentración.';
  return 'Debes reforzar los conceptos básicos.';
};

export default scoreAnalyzer;