import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const SpeedRound = ({ onNavigate, onScore, onProgress, settings, gameType = 'math' }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, isActive]);

  useEffect(() => {
    if (isActive) {
      generateQuestion();
    }
  }, [isActive]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let answer;
    if (op === '+') answer = num1 + num2;
    else if (op === '-') answer = Math.abs(num1 - num2);
    else answer = num1 * num2;
    
    setCurrentQuestion({ num1, num2, op, answer });
    setUserAnswer('');
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setQuestionsAnswered(prev => prev + 1);
      setFinalScore(prev => prev + 10);
      if (settings.soundEnabled) soundEffects.playSuccess();
      generateQuestion();
    } else {
      if (settings.soundEnabled) soundEffects.playError();
    }
  };

  const startGame = () => {
    setIsActive(true);
    setTimeLeft(60);
    setQuestionsAnswered(0);
    setFinalScore(0);
  };

  const endGame = () => {
    setIsActive(false);
    onScore(finalScore);
    onProgress('mathProblems', questionsAnswered);
  };

  if (!isActive && timeLeft === 60) {
    return (
      <motion.div className="game-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
        
        <h2>⚡ Speed Round!</h2>
        <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>Answer as many questions as you can in 60 seconds!</p>
        
        <motion.button
          onClick={startGame}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            fontSize: '2rem',
            padding: '30px 60px',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          START! 🚀
        </motion.button>
      </motion.div>
    );
  }

  if (!isActive && timeLeft === 0) {
    return (
      <motion.div className="game-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
        
        <h2>⚡ Speed Round Complete!</h2>
        
        <div style={{ fontSize: '4rem', margin: '30px 0', color: '#28a745' }}>
          {questionsAnswered}
        </div>
        <p style={{ fontSize: '2rem' }}>Questions Answered!</p>
        
        <div style={{ fontSize: '2rem', margin: '20px 0', color: '#667eea' }}>
          Score: {finalScore} points
        </div>
        
        <motion.button
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: '1.5rem',
            padding: '20px 40px',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
        >
          Play Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>
        <div style={{ color: '#ff6b6b' }}>⏱️ {timeLeft}s</div>
        <div style={{ color: '#28a745' }}>✅ {questionsAnswered}</div>
      </div>

      <motion.div
        key={`${currentQuestion.num1}-${currentQuestion.op}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: '4rem', margin: '50px 0', fontWeight: 'bold', color: '#667eea' }}
      >
        {currentQuestion.num1} {currentQuestion.op} {currentQuestion.num2} = ?
      </motion.div>

      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        style={{
          fontSize: '3rem',
          padding: '20px',
          borderRadius: '15px',
          border: '4px solid #667eea',
          textAlign: 'center',
          width: '250px',
          marginBottom: '20px'
        }}
      />

      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          fontSize: '2rem',
          padding: '20px 40px',
          borderRadius: '15px',
          border: 'none',
          background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Submit ⚡
      </motion.button>
    </motion.div>
  );
};

export default SpeedRound;