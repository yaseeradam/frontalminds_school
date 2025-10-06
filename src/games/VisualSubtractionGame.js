import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const VisualSubtractionGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [gameState, setGameState] = useState('question'); // question, correct, incorrect
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const getDifficultyRange = () => {
    switch (settings.difficulty) {
      case 'easy': return { min: 1, max: 5 };
      case 'medium': return { min: 1, max: 10 };
      case 'hard': return { min: 5, max: 20 };
      default: return { min: 1, max: 10 };
    }
  };

  const generateQuestion = () => {
    const { min, max } = getDifficultyRange();
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 < num1 for positive results
    const answer = num1 - num2;

    // Generate wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 2) {
      const wrong = answer + (Math.floor(Math.random() * 6) - 3);
      if (wrong !== answer && wrong >= 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      num1,
      num2,
      answer,
      options,
      totalApples: num1,
      removedApples: num2,
      remainingApples: answer
    });
    setGameState('question');
    setSelectedAnswer(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (gameState !== 'question') return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setGameState('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => prev + 10 + (newStreak * 2));

      let points = 10;
      if (settings.difficulty === 'hard') points += 5;
      points += newStreak;

      onScore(points);
      onProgress('mathProblems');

      if (settings.soundEnabled) {
        soundEffects.playSuccess();
      }

      setTimeout(() => {
        setGameState('question');
        generateQuestion();
      }, 2000);
    } else {
      setGameState('incorrect');
      setStreak(0);

      if (settings.soundEnabled) {
        soundEffects.playError();
      }

      setTimeout(() => {
        generateQuestion();
      }, 2500);
    }
  };

  const Apple = ({ apple, delay = 0, animate = true }) => (
    <motion.div
      className={`apple ${animate ? 'animate' : ''}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: animate ? [0, 1.2, 1] : 1,
        opacity: 1,
        rotate: animate ? [0, 10, -10, 0] : 0
      }}
      transition={{
        duration: 0.6,
        delay,
        rotate: { repeat: animate ? Infinity : 0, duration: 3, ease: "easeInOut" }
      }}
      style={{
        position: 'relative'
      }}
    >
      <div className="apple-body" style={{ backgroundColor: '#ff4444' }}>
        <div className="apple-highlight" style={{ backgroundColor: '#ff6666' }}></div>
      </div>
      <div className="apple-stem" style={{ backgroundColor: '#8B4513' }}></div>
      <div className="apple-leaf" style={{ backgroundColor: '#228B22' }}></div>
    </motion.div>
  );

  const OptionButton = ({ option, index }) => (
    <motion.button
      className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
      onClick={() => handleAnswerSelect(option)}
      disabled={gameState !== 'question'}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: selectedAnswer === option
          ? (gameState === 'correct' ? '#4CAF50' : '#f44336')
          : 'linear-gradient(135deg, #ff6b6b, #feca57)',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '15px 25px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: gameState === 'question' ? 'pointer' : 'default',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transform: selectedAnswer === option ? 'scale(1.1)' : 'scale(1)'
      }}
    >
      {option}
    </motion.button>
  );

  return (
    <div className="visual-game-container">
      <button className="back-button" onClick={() => onNavigate('menu')}>
        ← Back to Menu
      </button>

      <div className="game-header">
        <h2>🍎 Learn Subtraction!</h2>
        <div className="game-stats">
          <p>Score: {score} points</p>
          <p>Streak: {streak} 🔥</p>
          <p>Difficulty: {settings.difficulty}</p>
        </div>
      </div>

      <div className="subtraction-display">
        <div className="apple-equation">
          {/* First group - starting apples */}
          <div className="apple-group">
            <div className="apples-container">
              {Array.from({ length: currentQuestion.num1 }).map((_, i) => (
                <Apple
                  key={`initial-${i}`}
                  apple={{ id: i }}
                  delay={i * 0.1}
                  animate={true}
                />
              ))}
            </div>
            <div className="number-label">{currentQuestion.num1}</div>
          </div>

          <div className="minus-sign">-</div>

          {/* Second group - apples being removed */}
          <div className="apple-group">
            <div className="apples-container">
              {Array.from({ length: currentQuestion.num2 }).map((_, i) => (
                <Apple
                  key={`removed-${i}`}
                  apple={{ id: i }}
                  delay={i * 0.1 + 0.3}
                  animate={gameState === 'question'}
                />
              ))}
            </div>
            <div className="number-label">{currentQuestion.num2}</div>
          </div>

          <div className="equals-sign">=</div>

          {/* Result group - remaining apples */}
          <div className="apple-group">
            <div className="apples-container">
              {Array.from({ length: currentQuestion.answer }).map((_, i) => (
                <Apple
                  key={`remaining-${i}`}
                  apple={{ id: i }}
                  delay={i * 0.05 + 0.8}
                  animate={gameState === 'correct'}
                />
              ))}
            </div>
            <div className="question-mark">?</div>
          </div>
        </div>

        {/* Visual representation of subtraction */}
        <div className="subtraction-visual">
          <div className="before-removal">
            <p>Starting apples:</p>
            <div className="apple-row">
              {Array.from({ length: Math.min(currentQuestion.num1, 8) }).map((_, i) => (
                <Apple key={`visual-${i}`} apple={{ id: i }} delay={i * 0.05} />
              ))}
              {currentQuestion.num1 > 8 && <span className="more-apples">+{currentQuestion.num1 - 8} more</span>}
            </div>
          </div>

          <div className="removal-indicator">
            <p>Remove {currentQuestion.num2} apples:</p>
            <div className="removal-arrow">↓</div>
          </div>

          <div className="after-removal">
            <p>Apples left:</p>
            <div className="apple-row">
              {Array.from({ length: Math.min(currentQuestion.answer, 8) }).map((_, i) => (
                <Apple key={`result-visual-${i}`} apple={{ id: i }} delay={i * 0.05 + 1} />
              ))}
              {currentQuestion.answer > 8 && <span className="more-apples">+{currentQuestion.answer - 8} more</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="options-container">
        <AnimatePresence mode="wait">
          {gameState === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="options-grid"
            >
              {currentQuestion.options?.map((option, index) => (
                <OptionButton key={option} option={option} index={index} />
              ))}
            </motion.div>
          )}

          {gameState === 'correct' && (
            <motion.div
              key="correct"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="feedback correct"
            >
              <div className="feedback-icon">🎉</div>
              <h3>Excellent work!</h3>
              <p>You figured out how many apples are left!</p>
            </motion.div>
          )}

          {gameState === 'incorrect' && (
            <motion.div
              key="incorrect"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="feedback incorrect"
            >
              <div className="feedback-icon">😊</div>
              <h3>Good try!</h3>
              <p>The correct answer is {currentQuestion.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .visual-game-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .game-header {
          margin-bottom: 30px;
        }

        .game-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 10px;
        }

        .subtraction-display {
          margin: 40px 0;
          background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .apple-equation {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .apple-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .apples-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          min-height: 80px;
          max-width: 200px;
        }

        .apple {
          position: relative;
          width: 50px;
          height: 60px;
        }

        .apple-body {
          width: 45px;
          height: 45px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .apple-highlight {
          width: 20px;
          height: 25px;
          border-radius: 50%;
          position: absolute;
          top: 5px;
          left: 8px;
          opacity: 0.7;
        }

        .apple-stem {
          width: 3px;
          height: 12px;
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .apple-leaf {
          width: 8px;
          height: 8px;
          position: absolute;
          top: -6px;
          right: -2px;
          border-radius: 50% 0;
          transform: rotate(45deg);
        }

        .number-label {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          background: white;
          padding: 10px 15px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          min-width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .minus-sign, .equals-sign {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin: 0 20px;
        }

        .question-mark {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          background: white;
          padding: 10px 20px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          min-width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subtraction-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 15px;
        }

        .before-removal, .after-removal {
          text-align: center;
        }

        .before-removal p, .after-removal p {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #333;
        }

        .apple-row {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 400px;
        }

        .more-apples {
          font-size: 1rem;
          color: #666;
          margin-left: 10px;
        }

        .removal-indicator {
          text-align: center;
        }

        .removal-indicator p {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: #666;
        }

        .removal-arrow {
          font-size: 2rem;
          color: #ff6b6b;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .options-container {
          margin-top: 40px;
          min-height: 150px;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          max-width: 400px;
          margin: 0 auto;
        }

        .option-button {
          transition: all 0.3s ease;
        }

        .option-button:disabled {
          cursor: not-allowed !important;
        }

        .feedback {
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          max-width: 400px;
          margin: 0 auto;
        }

        .feedback.correct {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
        }

        .feedback.incorrect {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
        }

        .feedback-icon {
          font-size: 4rem;
          margin-bottom: 15px;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default VisualSubtractionGame;
