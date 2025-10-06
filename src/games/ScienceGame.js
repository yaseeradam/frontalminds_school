import React, { useState } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const ScienceGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [currentExperiment, setCurrentExperiment] = useState('colors');
  const [mixedColors, setMixedColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const experiments = {
    colors: {
      title: '🎨 Color Mixing Lab',
      description: 'Mix colors to create new ones!',
      colors: ['red', 'blue', 'yellow'],
      results: {
        'red,blue': { color: 'purple', emoji: '💜' },
        'red,yellow': { color: 'orange', emoji: '🧡' },
        'blue,yellow': { color: 'green', emoji: '💚' },
        'red,blue,yellow': { color: 'brown', emoji: '🤎' }
      }
    }
  };

  const handleColorSelect = (color) => {
    if (selectedColors.length < 3 && !selectedColors.includes(color)) {
      const newSelection = [...selectedColors, color];
      setSelectedColors(newSelection);
      
      if (newSelection.length >= 2) {
        const key = newSelection.sort().join(',');
        const result = experiments.colors.results[key];
        
        if (result) {
          setMixedColors([...mixedColors, result]);
          onScore(20);
          onProgress('experiments');
          
          if (settings.soundEnabled) {
            soundEffects.playSuccess();
          }
          
          setTimeout(() => setSelectedColors([]), 1500);
        }
      }
    }
  };

  const resetExperiment = () => {
    setSelectedColors([]);
    setMixedColors([]);
  };

  return (
    <motion.div 
      className="game-container"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-button" onClick={() => onNavigate('menu')}>
        ← Back to Menu
      </button>
      
      <h2>🔬 Science Lab!</h2>
      
      <div className="experiment-area">
        <h3>{experiments[currentExperiment].title}</h3>
        <p>{experiments[currentExperiment].description}</p>
        
        <div className="color-palette">
          {experiments[currentExperiment].colors.map(color => (
            <motion.button
              key={color}
              className={`color-button ${color}`}
              onClick={() => handleColorSelect(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                backgroundColor: color,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: selectedColors.includes(color) ? '4px solid #333' : '2px solid #ccc',
                margin: '10px',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        <div className="mixing-area">
          <h4>Selected Colors:</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {selectedColors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '2px solid #333'
                }}
              />
            ))}
          </div>
        </div>

        <div className="results-area">
          <h4>Your Creations:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            {mixedColors.map((result, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="color-result"
                style={{
                  padding: '15px',
                  borderRadius: '10px',
                  backgroundColor: result.color,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  minWidth: '100px'
                }}
              >
                {result.emoji}<br/>
                {result.color}
              </motion.div>
            ))}
          </div>
        </div>

        <button 
          onClick={resetExperiment}
          className="reset-button"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🔄 Reset Experiment
        </button>
      </div>
    </motion.div>
  );
};

export default ScienceGame;