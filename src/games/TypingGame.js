import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const TypingGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const sentences = [
    'the quick brown fox jumps over the lazy dog',
    'pack my box with five dozen liquor jugs',
    'how vexingly quick daft zebras jump',
    'the five boxing wizards jump quickly'
  ];

  const [targetText, setTargetText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const inputRef = useRef(null);

  const fingerMap = {
    'q': 'L4', 'w': 'L3', 'e': 'L2', 'r': 'L1', 't': 'L1',
    'y': 'R1', 'u': 'R1', 'i': 'R2', 'o': 'R3', 'p': 'R4',
    'a': 'L4', 's': 'L3', 'd': 'L2', 'f': 'L1', 'g': 'L1',
    'h': 'R1', 'j': 'R1', 'k': 'R2', 'l': 'R3',
    'z': 'L4', 'x': 'L3', 'c': 'L2', 'v': 'L1', 'b': 'L1',
    'n': 'R1', 'm': 'R1', ' ': 'Thumb'
  };

  const keyboard = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  useEffect(() => {
    setTargetText(sentences[Math.floor(Math.random() * sentences.length)]);
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setTypedText(value);
    setCurrentIndex(value.length);

    if (value[value.length - 1] !== targetText[value.length - 1]) {
      setErrors(prev => prev + 1);
    }

    const acc = value.length > 0 ? Math.floor(((value.length - errors) / value.length) * 100) : 100;
    setAccuracy(Math.max(0, acc));

    if (value === targetText) {
      const timeInSeconds = (Date.now() - startTime) / 1000;
      const wordsTyped = targetText.split(' ').length;
      const calculatedWpm = Math.round((wordsTyped / timeInSeconds) * 60);
      
      setTimeTaken(Math.round(timeInSeconds));
      setWpm(calculatedWpm);
      setShowCongrats(true);
      
      onScore(50 + (accuracy > 95 ? 50 : 0));
      onProgress('wordsTyped');
      if (settings.soundEnabled) soundEffects.playSuccess();
    }
  };

  const nextChar = targetText[currentIndex] || '';
  const currentFinger = fingerMap[nextChar.toLowerCase()] || '';

  const handleNextSentence = () => {
    setShowCongrats(false);
    setTargetText(sentences[Math.floor(Math.random() * sentences.length)]);
    setTypedText('');
    setCurrentIndex(0);
    setErrors(0);
    setAccuracy(100);
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (showCongrats) {
    return (
      <motion.div className="game-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ padding: '40px', textAlign: 'center' }}>
        <button className="back-button" onClick={() => onNavigate('menu')} style={{ position: 'absolute', top: '-30px', left: '10px', margin: 0 }}>← Back</button>
        
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{ fontSize: '4rem', color: '#28a745', marginBottom: '30px' }}>🎉 Congratulations! 🎉</h1>
        </motion.div>

        <div style={{ 
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          padding: '40px',
          borderRadius: '20px',
          color: 'white',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Your Stats</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', fontSize: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{wpm}</div>
              <div>Words Per Minute</div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{accuracy}%</div>
              <div>Accuracy</div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{timeTaken}s</div>
              <div>Time Taken</div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '15px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{errors}</div>
              <div>Errors</div>
            </div>
          </div>

          <motion.button
            onClick={handleNextSentence}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: '40px',
              padding: '20px 50px',
              fontSize: '1.5rem',
              borderRadius: '15px',
              border: 'none',
              background: 'linear-gradient(135deg, #feca57, #ff6b6b)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
            }}
          >
            Next Sentence →
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const getKeyStyle = (key) => {
    const isNext = key === nextChar.toLowerCase();
    const isSpace = key === ' ' && nextChar === ' ';
    
    return {
      width: key === ' ' ? '350px' : '55px',
      height: '50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: isNext || isSpace 
        ? 'linear-gradient(145deg, #feca57, #ff6b6b)' 
        : 'linear-gradient(145deg, #ecf0f1, #bdc3c7)',
      border: '2px solid #95a5a6',
      borderRadius: '6px',
      fontWeight: 'bold',
      boxShadow: isNext || isSpace 
        ? '0 6px 20px rgba(255,107,107,0.6), inset 0 -3px 0 rgba(0,0,0,0.2)' 
        : '0 3px 0 #7f8c8d, inset 0 -3px 0 rgba(0,0,0,0.2)',
      transition: 'all 0.15s ease',
      transform: isNext || isSpace ? 'translateY(2px)' : 'translateY(0)',
      cursor: 'pointer',
      position: 'relative'
    };
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ padding: '10px', maxHeight: '90vh', overflow: 'hidden', position: 'relative' }}>
      <button className="back-button" onClick={() => onNavigate('menu')} style={{ position: 'absolute', top: '-30px', left: '10px', margin: 0 }}>← Back</button>
      
      {/* Computer Monitor */}
      <div style={{ 
        margin: '10px auto', 
        maxWidth: '800px',
        background: 'linear-gradient(145deg, #2c3e50, #34495e)',
        padding: '15px',
        borderRadius: '15px 15px 5px 5px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
      }}>
        {/* Monitor Screen */}
        <div style={{
          background: '#1a1a1a',
          padding: '20px',
          borderRadius: '8px',
          height: '180px',
          border: '3px solid #000',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
          overflow: 'hidden'
        }}>
          {/* Stats Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#0f0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
            <div>Accuracy: {accuracy}%</div>
            <div>Finger: {currentFinger}</div>
            <div>Progress: {currentIndex}/{targetText.length}</div>
          </div>
          
          {/* Text Display */}
          <div style={{ 
            fontSize: '1.8rem', 
            fontFamily: 'monospace', 
            lineHeight: '1.6',
            color: '#0f0',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          }}>
            {targetText.split('').map((char, idx) => (
              <span
                key={idx}
                style={{
                  color: idx < typedText.length 
                    ? (typedText[idx] === char ? '#0f0' : '#f00')
                    : '#555',
                  background: idx === currentIndex ? '#feca57' : 'transparent',
                  padding: '2px 3px',
                  borderRadius: '3px',
                  textShadow: idx < typedText.length ? '0 0 5px currentColor' : 'none'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div style={{ 
          width: '80px', 
          height: '15px', 
          background: 'linear-gradient(145deg, #34495e, #2c3e50)', 
          margin: '0 auto',
          borderRadius: '0 0 8px 8px'
        }} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleChange}
        autoFocus
        onBlur={(e) => e.target.focus()}
        style={{ position: 'fixed', top: '-100px', left: '-100px', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Realistic Keyboard */}
      <div style={{ 
        margin: '15px auto',
        maxWidth: '800px',
        background: 'linear-gradient(145deg, #2c3e50, #34495e)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
      }}>
        {/* Number Row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(key => (
            <div key={key} style={{ ...getKeyStyle(key), width: '55px', height: '50px' }}>
              <div style={{ fontSize: '1.1rem' }}>{key}</div>
            </div>
          ))}
        </div>
        
        {/* Letter Rows */}
        {keyboard.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
            {row.map(key => (
              <div key={key} style={getKeyStyle(key)}>
                <div style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>{key}</div>
                {fingerMap[key] && (
                  <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '1px' }}>
                    {fingerMap[key]}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        
        {/* Space Bar Row */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
          <div style={getKeyStyle(' ')}>
            <div style={{ fontSize: '1rem' }}>SPACE</div>
            <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '1px' }}>Thumbs</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingGame;