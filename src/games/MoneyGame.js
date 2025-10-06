import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const MoneyGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const coins = [
    { value: 1, emoji: '🪙', name: 'Penny' },
    { value: 5, emoji: '🪙', name: 'Nickel' },
    { value: 10, emoji: '🪙', name: 'Dime' },
    { value: 25, emoji: '🪙', name: 'Quarter' }
  ];

  const [targetAmount, setTargetAmount] = useState(0);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const amount = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50][Math.floor(Math.random() * 10)];
    setTargetAmount(amount);
    setSelectedCoins([]);
    setFeedback('');
  };

  const handleCoinClick = (coin) => {
    const currentTotal = selectedCoins.reduce((sum, c) => sum + c.value, 0);
    if (currentTotal + coin.value <= targetAmount) {
      setSelectedCoins([...selectedCoins, coin]);
      
      if (currentTotal + coin.value === targetAmount) {
        setFeedback('🎉 Perfect! You made the exact amount!');
        setStreak(prev => prev + 1);
        onScore(25 + streak * 5);
        onProgress('mathProblems');
        if (settings.soundEnabled) soundEffects.playSuccess();
        setTimeout(() => generateQuestion(), 2000);
      }
    }
  };

  const currentTotal = selectedCoins.reduce((sum, c) => sum + c.value, 0);

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>💰 Money Master!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ fontSize: '2rem', margin: '30px 0', fontWeight: 'bold', color: '#28a745' }}>
        Make: ${(targetAmount / 100).toFixed(2)}
      </div>

      <div style={{ fontSize: '1.5rem', margin: '20px 0', color: '#667eea' }}>
        Current: ${(currentTotal / 100).toFixed(2)}
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', margin: '30px 0', flexWrap: 'wrap' }}>
        {coins.map((coin, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleCoinClick(coin)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: '4rem',
              padding: '20px',
              borderRadius: '50%',
              border: '4px solid #feca57',
              background: 'linear-gradient(135deg, #feca57, #ff6b6b)',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            {coin.emoji}
            <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold', marginTop: '5px' }}>
              {coin.value}¢
            </div>
          </motion.button>
        ))}
      </div>

      <div style={{ minHeight: '100px', background: '#f8f9fa', padding: '20px', borderRadius: '15px', margin: '20px 0' }}>
        <h3>Selected Coins:</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
          {selectedCoins.map((coin, idx) => (
            <div key={idx} style={{ fontSize: '2rem' }}>{coin.emoji}</div>
          ))}
        </div>
      </div>

      <button onClick={generateQuestion} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#6c757d', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
        🔄 New Amount
      </button>

      {feedback && <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="feedback correct" style={{ fontSize: '1.5rem', marginTop: '20px' }}>{feedback}</motion.div>}
    </motion.div>
  );
};

export default MoneyGame;