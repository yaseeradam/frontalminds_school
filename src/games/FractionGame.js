import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const FractionGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(4);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const denom = [2, 3, 4, 6, 8][Math.floor(Math.random() * 5)];
    const numer = Math.floor(Math.random() * (denom - 1)) + 1;
    setNumerator(numer);
    setDenominator(denom);
    setFeedback('');
    
    // Generate options
    const correctAnswer = `${numer}/${denom}`;
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const wrongNum = Math.floor(Math.random() * denom) + 1;
      const wrongAns = `${wrongNum}/${denom}`;
      if (wrongAns !== correctAnswer && !wrongOptions.includes(wrongAns)) {
        wrongOptions.push(wrongAns);
      }
    }
    setOptions([correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5));
  };

  const speakFraction = () => {
    if (!settings.voiceEnabled) return;
    const text = `${numerator} out of ${denominator}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer) => {
    if (answer === `${numerator}/${denominator}`) {
      setFeedback('🎉 Perfect!');
      setStreak(prev => prev + 1);
      onScore(20 + streak * 5);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => { setFeedback(''); generateQuestion(); }, 2000);
    } else {
      setFeedback(`Try again!`);
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const renderItems = () => {
    const items = [];
    const emojis = ['🍕', '🍎', '🍪', '🍰', '🍩', '🧁', '🍓', '🍌'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    for (let i = 0; i < denominator; i++) {
      const isShaded = i < numerator;
      items.push(
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          style={{
            fontSize: '5rem',
            opacity: isShaded ? 1 : 0.2,
            filter: isShaded ? 'none' : 'grayscale(100%)',
            transition: 'all 0.3s ease'
          }}
        >
          {emoji}
        </motion.div>
      );
    }
    return items;
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🍕 Fraction Pizza!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <p style={{ fontSize: '2rem', margin: '20px 0', fontWeight: 'bold', color: '#667eea' }}>What fraction is shaded?</p>
        {settings.voiceEnabled && (
          <button onClick={speakFraction} style={{ fontSize: '2rem', padding: '10px 15px', borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', cursor: 'pointer', width: '60px', height: '60px' }} title="Read question aloud">
            🔊
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '600px', margin: '30px auto', padding: '40px', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,249,250,0.9))', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        {renderItems()}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '500px', margin: '30px auto' }}>
        {options.map((option, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleAnswer(option)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: '2.5rem',
              padding: '30px',
              borderRadius: '20px',
              border: '4px solid #667eea',
              background: 'linear-gradient(135deg, #fff, #f8f9fa)',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {feedback && <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Perfect') ? 'correct' : 'incorrect'}`} style={{ fontSize: '2rem', marginTop: '20px' }}>{feedback}</motion.div>}
    </motion.div>
  );
};

export default FractionGame;