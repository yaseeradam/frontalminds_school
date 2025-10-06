import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const MathGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameMode, setGameMode] = useState('normal'); // normal, timed

  const getDifficultyRange = () => {
    switch (settings.difficulty) {
      case 'easy': return { min: 1, max: 10 };
      case 'medium': return { min: 1, max: 20 };
      case 'hard': return { min: 10, max: 50 };
      default: return { min: 1, max: 10 };
    }
  };

  const generateQuestion = () => {
    const { min, max } = getDifficultyRange();
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    
    let operations = ['+', '-', '×'];
    if (settings.difficulty === 'hard') {
      operations.push('÷');
    }
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = Math.abs(num1 - num2);
        break;
      case '×':
        answer = num1 * num2;
        break;
      case '÷':
        const dividend = num1 * num2;
        answer = num1;
        setQuestion({ num1: dividend, num2, operation, answer });
        setUserAnswer('');
        setFeedback('');
        return;
      default:
        answer = num1 + num2;
    }

    setQuestion({ num1, num2, operation, answer });
    setUserAnswer('');
    setFeedback('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === question.answer;
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setFeedback('🎉 Amazing work!');
      setStreak(newStreak);
      
      let points = 10;
      if (gameMode === 'timed') points += 5;
      if (settings.difficulty === 'hard') points += 10;
      points += newStreak * 3;
      
      onScore(points);
      onProgress('mathProblems');
      
      if (settings.soundEnabled) {
        soundEffects.playSuccess();
      }
      
      setTimeout(() => {
        setFeedback('');
        generateQuestion();
      }, 2000);
    } else {
      setFeedback(`😊 Good try! The answer is ${question.answer}`);
      setStreak(0);
      
      if (settings.soundEnabled) {
        soundEffects.playError();
      }
      
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const speakQuestion = () => {
    if (!settings.voiceEnabled) return;
    const text = `${question.num1} ${question.operation === '×' ? 'times' : question.operation === '÷' ? 'divided by' : question.operation === '+' ? 'plus' : 'minus'} ${question.num2}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
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
      
      <div className="game-header">
        <h2>🔢 Math Adventure!</h2>
        <div className="game-stats">
          <p>Streak: {streak} 🔥</p>
          <p>Difficulty: {settings.difficulty}</p>
          {gameMode === 'timed' && <p>Time: {timeLeft}s ⏱️</p>}
        </div>
        <div className="game-modes">
          <button 
            onClick={() => setGameMode('normal')}
            className={gameMode === 'normal' ? 'active' : ''}
          >
            Normal
          </button>
          <button 
            onClick={() => setGameMode('timed')}
            className={gameMode === 'timed' ? 'active' : ''}
          >
            Timed Challenge
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <motion.div 
          style={{ 
            fontSize: '3rem', 
            margin: '40px 0',
            color: '#4a5568',
            fontWeight: 'bold'
          }}
          key={`${question.num1}-${question.operation}-${question.num2}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {question.num1} {question.operation} {question.num2} = ?
        </motion.div>
        {settings.voiceEnabled && (
          <button
            onClick={speakQuestion}
            style={{
              fontSize: '2rem',
              padding: '10px 15px',
              borderRadius: '50%',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              cursor: 'pointer',
              width: '60px',
              height: '60px'
            }}
            title="Read question aloud"
          >
            🔊
          </button>
        )}
      </div>

      <div style={{ margin: '20px 0' }}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            fontSize: '2rem',
            padding: '15px',
            borderRadius: '10px',
            border: '3px solid #ddd',
            textAlign: 'center',
            width: '200px'
          }}
          placeholder="Your answer"
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={!userAnswer}
        style={{
          fontSize: '1.5rem',
          padding: '15px 30px',
          borderRadius: '15px',
          border: 'none',
          background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
          color: 'white',
          cursor: userAnswer ? 'pointer' : 'not-allowed',
          opacity: userAnswer ? 1 : 0.5
        }}
        whileHover={userAnswer ? { scale: 1.05 } : {}}
        whileTap={userAnswer ? { scale: 0.95 } : {}}
      >
        Check Answer! ✨
      </motion.button>

      {feedback && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: '1.5rem',
            margin: '20px 0',
            padding: '15px',
            borderRadius: '10px',
            background: feedback.includes('Awesome') ? '#d4edda' : '#fff3cd',
            color: feedback.includes('Awesome') ? '#155724' : '#856404'
          }}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MathGame;