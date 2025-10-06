import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const AIGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const challenges = [
    {
      type: 'pattern',
      title: 'Pattern Recognition',
      question: 'What comes next in this pattern?',
      pattern: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'],
      options: ['🔴', '🔵', '🟡', '🟢'],
      answer: '🔵',
      explanation: 'The pattern alternates: red, blue, red, blue...'
    },
    {
      type: 'classification',
      title: 'Smart Sorting',
      question: 'Which group does 🐶 belong to?',
      groups: {
        'Animals': ['🐱', '🐭', '🐹'],
        'Food': ['🍎', '🍌', '🍕'],
        'Toys': ['🧸', '⚽', '🎮']
      },
      options: ['Animals', 'Food', 'Toys'],
      answer: 'Animals',
      explanation: 'Dogs are animals, just like cats, mice, and hamsters!'
    },
    {
      type: 'prediction',
      title: 'Weather Prediction',
      question: 'If it\'s cloudy ☁️ and windy 💨, what might happen next?',
      options: ['☀️ Sunny', '🌧️ Rain', '❄️ Snow', '🌈 Rainbow'],
      answer: '🌧️ Rain',
      explanation: 'Clouds and wind often bring rain!'
    },
    {
      type: 'logic',
      title: 'Logic Puzzle',
      question: 'If all cats have whiskers, and Fluffy is a cat, then...',
      options: ['Fluffy has whiskers', 'Fluffy is big', 'Fluffy is orange', 'Fluffy likes fish'],
      answer: 'Fluffy has whiskers',
      explanation: 'Since all cats have whiskers and Fluffy is a cat, Fluffy must have whiskers!'
    }
  ];

  const currentQ = challenges[currentChallenge];

  const handleAnswer = (answer) => {
    if (answer === currentQ.answer) {
      setFeedback(`🎉 Correct! ${currentQ.explanation}`);
      setScore(prev => prev + 25);
      onScore(25);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      
      setTimeout(() => {
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(prev => prev + 1);
          setUserAnswer('');
          setFeedback('');
        } else {
          setFeedback('🏆 Amazing! You completed all AI challenges! You think like a smart computer!');
        }
      }, 3000);
    } else {
      setFeedback(`🤔 Not quite! Think about: ${currentQ.explanation}`);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const speakQuestion = () => {
    if (!settings.voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(currentQ.question);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const renderChallenge = () => {
    switch (currentQ.type) {
      case 'pattern':
        return (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '3rem', margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {currentQ.pattern.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  style={{
                    padding: '10px',
                    background: item === '?' ? '#f8f9fa' : 'transparent',
                    borderRadius: '10px',
                    border: item === '?' ? '2px dashed #667eea' : 'none'
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'classification':
        return (
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
              {Object.entries(currentQ.groups).map(([groupName, items]) => (
                <div key={groupName} style={{ padding: '15px', background: '#f8f9fa', borderRadius: '10px', textAlign: 'center' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '10px' }}>{groupName}</h4>
                  <div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    {items.map((item, idx) => <span key={idx}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: '3rem', padding: '20px', background: '#fff3cd', borderRadius: '10px' }}>
              🐶 ← Where does this belong?
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🤖 AI Learning Lab!</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Challenge {currentChallenge + 1} • Score: {score}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', padding: '20px', background: '#e8f5e8', borderRadius: '15px', maxWidth: '600px' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>{currentQ.title}</h3>
          <p style={{ color: '#2e7d32', fontSize: '1.2rem' }}>{currentQ.question}</p>
        </div>
        {settings.voiceEnabled && (
          <button onClick={speakQuestion} style={{ fontSize: '2rem', padding: '10px 15px', borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', cursor: 'pointer', width: '60px', height: '60px' }} title="Read question aloud">
            🔊
          </button>
        )}
      </div>

      {renderChallenge()}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
        {currentQ.options.map((option, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleAnswer(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px',
              borderRadius: '15px',
              border: '3px solid #4caf50',
              background: 'white',
              cursor: 'pointer',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#2e7d32',
              transition: 'all 0.3s ease'
            }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: '1.3rem',
            marginTop: '30px',
            padding: '20px',
            borderRadius: '15px',
            background: feedback.includes('Correct') || feedback.includes('Amazing') ? '#d4edda' : '#fff3cd',
            color: feedback.includes('Correct') || feedback.includes('Amazing') ? '#155724' : '#856404',
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '30px auto 0'
          }}
        >
          {feedback}
        </motion.div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', background: '#f0f8ff', borderRadius: '15px' }}>
        <h4 style={{ color: '#1976d2', marginBottom: '15px' }}>🧠 What is AI?</h4>
        <p style={{ color: '#1976d2', fontSize: '1rem', lineHeight: '1.5' }}>
          Artificial Intelligence (AI) helps computers think and learn like humans! AI can recognize patterns, 
          sort things into groups, make predictions, and solve problems - just like you're doing in this game!
        </p>
      </div>
    </motion.div>
  );
};

export default AIGame;