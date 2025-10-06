import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const VisualAdditionGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [gameState, setGameState] = useState('question'); // question, correct, incorrect
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const getDifficultyRange = () => {
    switch (settings.difficulty) {
      case 'easy': return { min: 1, max: 5 };
      case 'medium': return { min: 1, max: 10 };
      case 'hard': return { min: 5, max: 15 };
      default: return { min: 1, max: 10 };
    }
  };

  const generateQuestion = () => {
    const { min, max } = getDifficultyRange();
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const answer = num1 + num2;

    // Generate wrong answers
    const wrongAnswers = [];
    while (wrongAnswers.length < 2) {
      const wrong = answer + (Math.floor(Math.random() * 6) - 3);
      if (wrong !== answer && wrong > 0 && !wrongAnswers.includes(wrong)) {
        wrongAnswers.push(wrong);
      }
    }

    const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      num1,
      num2,
      answer,
      options,
      balloons: Array.from({ length: num1 + num2 }, (_, i) => ({
        id: i,
        color: ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5]
      }))
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

  const Balloon = ({ balloon, delay = 0 }) => (
    <motion.div
      className="balloon"
      initial={{ y: 50, opacity: 0, scale: 0.5 }}
      animate={{
        y: [0, -20, 0],
        opacity: 1,
        scale: 1
      }}
      transition={{
        y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay },
        opacity: { duration: 0.5 },
        scale: { duration: 0.3 }
      }}
      style={{
        backgroundColor: balloon.color,
        boxShadow: `0 4px 8px rgba(0,0,0,0.1)`
      }}
    >
      <div className="balloon-string"></div>
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
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        <h2>🎈 Learn Addition!</h2>
        <div className="game-stats">
          <p>Score: {score} points</p>
          <p>Streak: {streak} 🔥</p>
          <p>Difficulty: {settings.difficulty}</p>
        </div>
      </div>

      <div className="addition-display">
        <div className="balloon-groups">
          <div className="balloon-group">
            <div className="number-label">{currentQuestion.num1}</div>
            <div className="balloons-container">
              {Array.from({ length: currentQuestion.num1 }).map((_, i) => (
                <Balloon
                  key={`left-${i}`}
                  balloon={{
                    id: i,
                    color: ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][i % 5]
                  }}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          <div className="plus-sign">+</div>

          <div className="balloon-group">
            <div className="number-label">{currentQuestion.num2}</div>
            <div className="balloons-container">
              {Array.from({ length: currentQuestion.num2 }).map((_, i) => (
                <Balloon
                  key={`right-${i}`}
                  balloon={{
                    id: i + currentQuestion.num1,
                    color: ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][(i + 2) % 5]
                  }}
                  delay={i * 0.1 + 0.5}
                />
              ))}
            </div>
          </div>

          <div className="equals-sign">=</div>

          <div className="equals-group">
            <div className="equals-balloons">
              {currentQuestion.balloons?.map((balloon, i) => (
                <Balloon key={`result-${balloon.id}`} balloon={balloon} delay={i * 0.05} />
              ))}
            </div>
            <div className="question-mark">?</div>
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
              <h3>Amazing work!</h3>
              <p>You found the right answer!</p>
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
          max-width: 900px;
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

        .addition-display {
          margin: 40px 0;
          background: #f8f9fa;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .balloon-groups {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .balloon-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
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

        .balloons-container {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: center;
          max-width: 150px;
        }

        .balloon {
          width: 40px;
          height: 50px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          position: relative;
          margin: 2px;
        }

        .balloon-string {
          width: 2px;
          height: 20px;
          background: #666;
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
        }

        .plus-sign, .equals-sign {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin: 0 20px;
        }

        .equals-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .equals-balloons {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          justify-content: center;
          max-width: 200px;
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

export default VisualAdditionGame;
