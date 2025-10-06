import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const ShapeGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const shapes = [
    { name: 'circle', emoji: '⭕', svg: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10' },
    { name: 'square', emoji: '🟦', svg: 'M10,10 L90,10 L90,90 L10,90 Z' },
    { name: 'triangle', emoji: '🔺', svg: 'M50,10 L90,90 L10,90 Z' },
    { name: 'star', emoji: '⭐', svg: 'M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z' }
  ];

  const [currentShape, setCurrentShape] = useState({});
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const shuffled = [...shapes].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!shuffled.find(s => s.name === shape.name)) shuffled[0] = shape;
    
    setCurrentShape(shape);
    setOptions(shuffled.sort(() => Math.random() - 0.5));
    setFeedback('');
  };

  const handleAnswer = (selected) => {
    if (selected === currentShape.name) {
      setFeedback('🎉 Correct shape!');
      setStreak(prev => prev + 1);
      onScore(15 + streak * 3);
      onProgress('shapesIdentified');
      
      if (settings.soundEnabled) soundEffects.playSuccess();
      
      setTimeout(() => {
        setFeedback('');
        generateQuestion();
      }, 2000);
    } else {
      setFeedback('Try again!');
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <h2>🔷 Shape Recognition!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ margin: '40px 0' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>What shape is this?</p>
        <svg width="200" height="200" viewBox="0 0 100 100" style={{ margin: '20px auto', display: 'block' }}>
          <path d={currentShape.svg} fill="#667eea" stroke="#333" strokeWidth="2"/>
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {options.map((shape, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleAnswer(shape.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px 30px',
              fontSize: '1.5rem',
              borderRadius: '15px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {shape.emoji} {shape.name}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ShapeGame;