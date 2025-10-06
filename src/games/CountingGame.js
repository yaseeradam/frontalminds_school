import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const CountingGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const emojis = ['🐱', '🐶', '🦋', '🌟', '🍎', '🌸', '🐠', '🎈'];
  const [count, setCount] = useState(0);
  const [emoji, setEmoji] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const newCount = Math.floor(Math.random() * 10) + 1;
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setCount(newCount);
    setEmoji(newEmoji);
    setUserAnswer('');
    setFeedback('');
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === count) {
      setFeedback('🎉 Great counting!');
      setStreak(prev => prev + 1);
      onScore(10 + streak * 3);
      onProgress('objectsCounted');
      
      if (settings.soundEnabled) soundEffects.playSuccess();
      
      setTimeout(() => {
        setFeedback('');
        generateQuestion();
      }, 2000);
    } else {
      setFeedback(`Try again! Count carefully.`);
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <h2>🔢 Counting Fun!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ margin: '40px 0' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>How many do you see?</p>
        <div style={{ fontSize: '3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
          {Array.from({ length: count }).map((_, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        style={{
          fontSize: '2rem',
          padding: '15px',
          borderRadius: '10px',
          border: '3px solid #ddd',
          textAlign: 'center',
          width: '150px',
          margin: '20px 0'
        }}
        placeholder="?"
      />

      <motion.button
        onClick={handleSubmit}
        disabled={!userAnswer}
        whileHover={userAnswer ? { scale: 1.05 } : {}}
        whileTap={userAnswer ? { scale: 0.95 } : {}}
        style={{
          fontSize: '1.5rem',
          padding: '15px 30px',
          borderRadius: '15px',
          border: 'none',
          background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
          color: 'white',
          cursor: userAnswer ? 'pointer' : 'not-allowed',
          opacity: userAnswer ? 1 : 0.5,
          fontWeight: 'bold'
        }}
      >
        Check Answer! ✨
      </motion.button>

      {feedback && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Great') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CountingGame;