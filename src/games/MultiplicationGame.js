import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const MultiplicationGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [table, setTable] = useState(2);
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, [table]);

  const generateQuestion = () => {
    const multiplier = Math.floor(Math.random() * 12) + 1;
    setQuestion({ num1: table, num2: multiplier, answer: table * multiplier });
    setUserAnswer('');
    setFeedback('');
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === question.answer) {
      setFeedback('🎉 Correct!');
      setStreak(prev => prev + 1);
      onScore(15 + streak * 3);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => { setFeedback(''); generateQuestion(); }, 2000);
    } else {
      setFeedback(`Try again! ${question.num1} × ${question.num2} = ${question.answer}`);
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>✖️ Multiplication Tables!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ margin: '20px 0' }}>
        <label style={{ fontSize: '1.2rem', marginRight: '10px' }}>Choose Table:</label>
        <select value={table} onChange={(e) => setTable(parseInt(e.target.value))} style={{ fontSize: '1.2rem', padding: '10px', borderRadius: '10px' }}>
          {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxWidth: '700px', margin: '30px auto', background: '#f8f9fa', padding: '30px', borderRadius: '15px' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ padding: '25px', background: '#fff', borderRadius: '15px', textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', border: '3px solid #667eea', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            {table} × {i + 1} = {table * (i + 1)}
          </div>
        ))}
      </div>

      <motion.div style={{ fontSize: '3rem', margin: '30px 0', fontWeight: 'bold', color: '#667eea' }}>
        {question.num1} × {question.num2} = ?
      </motion.div>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        style={{ fontSize: '2rem', padding: '15px', borderRadius: '10px', border: '3px solid #ddd', textAlign: 'center', width: '200px' }}
        placeholder="Answer"
      />

      <motion.button onClick={handleSubmit} disabled={!userAnswer} whileHover={userAnswer ? { scale: 1.05 } : {}} whileTap={userAnswer ? { scale: 0.95 } : {}}
        style={{ fontSize: '1.5rem', padding: '15px 30px', borderRadius: '15px', border: 'none', background: 'linear-gradient(135deg, #ff6b6b, #feca57)', color: 'white', cursor: userAnswer ? 'pointer' : 'not-allowed', opacity: userAnswer ? 1 : 0.5, marginTop: '20px', fontWeight: 'bold' }}>
        Check Answer! ✨
      </motion.button>

      {feedback && <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>{feedback}</motion.div>}
    </motion.div>
  );
};

export default MultiplicationGame;