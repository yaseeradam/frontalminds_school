import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const ProgrammingGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const challenges = [
    {
      level: 1,
      title: 'Move the Robot Forward',
      description: 'Help the robot move 3 steps forward!',
      solution: 'forward(3)',
      hint: 'Use forward() with a number'
    },
    {
      level: 2,
      title: 'Turn and Move',
      description: 'Turn right and move 2 steps',
      solution: 'right()\nforward(2)',
      hint: 'Use right() then forward()'
    },
    {
      level: 3,
      title: 'Draw a Square',
      description: 'Make the robot draw a square!',
      solution: 'for i in range(4):\n  forward(2)\n  right()',
      hint: 'Use a loop to repeat 4 times'
    }
  ];

  const currentChallenge = challenges[currentLevel - 1];

  const checkCode = () => {
    const userCode = code.trim().toLowerCase().replace(/\s+/g, ' ');
    const correctCode = currentChallenge.solution.toLowerCase().replace(/\s+/g, ' ');
    
    if (userCode === correctCode || userCode.includes('forward') && userCode.includes('3') && currentLevel === 1) {
      setFeedback('🎉 Perfect! Your robot completed the task!');
      setScore(prev => prev + 20);
      onScore(20);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      
      setTimeout(() => {
        if (currentLevel < challenges.length) {
          setCurrentLevel(prev => prev + 1);
          setCode('');
          setFeedback('');
        } else {
          setFeedback('🏆 All challenges completed! You\'re a coding master!');
        }
      }, 2000);
    } else {
      setFeedback('🤔 Try again! ' + currentChallenge.hint);
      if (settings.soundEnabled) soundEffects.playError();
    }
  };

  const speakChallenge = () => {
    if (!settings.voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(currentChallenge.description);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>💻 Coding Adventure!</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Level {currentLevel} • Score: {score}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '15px', maxWidth: '600px' }}>
          <h3 style={{ color: '#1976d2', marginBottom: '10px' }}>{currentChallenge.title}</h3>
          <p style={{ color: '#1976d2', fontSize: '1.1rem' }}>{currentChallenge.description}</p>
        </div>
        {settings.voiceEnabled && (
          <button onClick={speakChallenge} style={{ fontSize: '2rem', padding: '10px 15px', borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', cursor: 'pointer', width: '60px', height: '60px' }} title="Read challenge aloud">
            🔊
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>📝 Write Your Code:</h4>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Type your code here..."
            style={{
              width: '100%',
              height: '200px',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid #ddd',
              fontSize: '1rem',
              fontFamily: 'monospace',
              resize: 'none'
            }}
          />
          <button
            onClick={checkCode}
            style={{
              marginTop: '15px',
              padding: '12px 30px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              width: '100%'
            }}
          >
            🚀 Run Code
          </button>
        </div>

        <div>
          <h4 style={{ marginBottom: '15px', color: '#667eea' }}>🤖 Robot Simulator:</h4>
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            borderRadius: '10px',
            border: '2px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <motion.div
              animate={{ rotate: code.includes('right') ? 90 : 0 }}
              style={{ fontSize: '3rem' }}
            >
              🤖
            </motion.div>
            {code.includes('forward') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  color: '#28a745',
                  fontWeight: 'bold'
                }}
              >
                Moving...
              </motion.div>
            )}
          </div>
          
          <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '10px' }}>
            <h5 style={{ color: '#856404', marginBottom: '10px' }}>💡 Commands:</h5>
            <ul style={{ color: '#856404', fontSize: '0.9rem', margin: 0, paddingLeft: '20px' }}>
              <li>forward(steps) - Move forward</li>
              <li>right() - Turn right</li>
              <li>left() - Turn left</li>
              <li>for i in range(n): - Repeat n times</li>
            </ul>
          </div>
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: '1.5rem',
            marginTop: '30px',
            padding: '20px',
            borderRadius: '15px',
            background: feedback.includes('Perfect') || feedback.includes('completed') ? '#d4edda' : '#fff3cd',
            color: feedback.includes('Perfect') || feedback.includes('completed') ? '#155724' : '#856404',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgrammingGame;