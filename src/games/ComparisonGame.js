import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const ComparisonGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 100) + 1;
    const n2 = Math.floor(Math.random() * 100) + 1;
    setNum1(n1);
    setNum2(n2);
    setFeedback('');
  };

  const handleAnswer = (answer) => {
    let correct = false;
    if (answer === '>' && num1 > num2) correct = true;
    if (answer === '<' && num1 < num2) correct = true;
    if (answer === '=' && num1 === num2) correct = true;

    if (correct) {
      setFeedback('🎉 Correct!');
      setStreak(prev => prev + 1);
      onScore(15 + streak * 3);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => generateQuestion(), 2000);
    } else {
      setFeedback('Try again!');
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🐊 Greater or Less!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', margin: '50px 0', fontSize: '4rem', fontWeight: 'bold' }}>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ color: '#667eea' }}>
          {num1}
        </motion.div>
        
        <div style={{ fontSize: '6rem' }}>🐊</div>
        
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ color: '#ff6b6b' }}>
          {num2}
        </motion.div>
      </div>

      <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '30px' }}>The alligator eats the bigger number!</p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {['<', '=', '>'].map((symbol) => (
          <motion.button
            key={symbol}
            onClick={() => handleAnswer(symbol)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: '4rem',
              padding: '30px 50px',
              borderRadius: '20px',
              border: '4px solid #667eea',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}
          >
            {symbol}
          </motion.button>
        ))}
      </div>

      {feedback && <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`} style={{ fontSize: '2rem', marginTop: '30px' }}>{feedback}</motion.div>}
    </motion.div>
  );
};

export default ComparisonGame;