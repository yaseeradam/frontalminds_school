import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const QuizGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [gameState, setGameState] = useState('question'); // question, correct, incorrect
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentMoneyValue, setCurrentMoneyValue] = useState(100000);
  const [timeLeft, setTimeLeft] = useState(30);
  const [useTimer, setUseTimer] = useState(false);

  const moneyValues = [100000, 200000, 300000, 500000, 1000000];

  const questions = [
    {
      question: "What color does yellow and red make?",
      options: ["A: Blue", "B: Orange", "C: Pink", "D: Brown"],
      correct: 1, // B: Orange
      category: "colors"
    },
    {
      question: "What animal says 'meow'?",
      options: ["A: Dog", "B: Cat", "C: Bird", "D: Fish"],
      correct: 1, // B: Cat
      category: "animals"
    },
    {
      question: "How many legs does a spider have?",
      options: ["A: 6", "B: 8", "C: 10", "D: 12"],
      correct: 1, // B: 8
      category: "nature"
    },
    {
      question: "What do bees make?",
      options: ["A: Milk", "B: Honey", "C: Juice", "D: Water"],
      correct: 1, // B: Honey
      category: "nature"
    },
    {
      question: "What shape has 3 sides?",
      options: ["A: Circle", "B: Square", "C: Triangle", "D: Rectangle"],
      correct: 2, // C: Triangle
      category: "shapes"
    },
    {
      question: "What is 2 + 2?",
      options: ["A: 3", "B: 4", "C: 5", "D: 6"],
      correct: 1, // B: 4
      category: "math"
    },
    {
      question: "What color is an apple?",
      options: ["A: Blue", "B: Green", "C: Red", "D: Yellow"],
      correct: 2, // C: Red
      category: "colors"
    },
    {
      question: "What do you use to tell time?",
      options: ["A: Ruler", "B: Clock", "C: Scale", "D: Thermometer"],
      correct: 1, // B: Clock
      category: "objects"
    },
    {
      question: "Which is a fruit?",
      options: ["A: Carrot", "B: Potato", "C: Banana", "D: Onion"],
      correct: 2, // C: Banana
      category: "food"
    },
    {
      question: "How many wheels does a car have?",
      options: ["A: 2", "B: 3", "C: 4", "D: 5"],
      correct: 2, // C: 4
      category: "vehicles"
    },
    {
      question: "What do you drink from?",
      options: ["A: Plate", "B: Bowl", "C: Cup", "D: Fork"],
      correct: 2, // C: Cup
      category: "objects"
    },
    {
      question: "Which animal lives in water?",
      options: ["A: Lion", "B: Elephant", "C: Monkey", "D: Fish"],
      correct: 3, // D: Fish
      category: "animals"
    },
    {
      question: "What color is the sky?",
      options: ["A: Green", "B: Blue", "C: Red", "D: Yellow"],
      correct: 1, // B: Blue
      category: "colors"
    },
    {
      question: "How many fingers do you have?",
      options: ["A: 8", "B: 10", "C: 12", "D: 20"],
      correct: 1, // B: 10
      category: "body"
    },
    {
      question: "What do you do with a book?",
      options: ["A: Eat it", "B: Read it", "C: Throw it", "D: Break it"],
      correct: 1, // B: Read it
      category: "actions"
    }
  ];

  const getDifficultyMultiplier = () => {
    switch (settings.difficulty) {
      case 'easy': return 1;
      case 'medium': return 1.5;
      case 'hard': return 2;
      default: return 1;
    }
  };

  const generateQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setGameState('question');
    setSelectedAnswer(null);

    if (useTimer) {
      setTimeLeft(30);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    let timer;
    if (useTimer && gameState === 'question' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'question') {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, useTimer]);

  const handleTimeUp = () => {
    setGameState('incorrect');
    setStreak(0);

    if (settings.soundEnabled) {
      soundEffects.playError();
    }

      setTimeout(() => {
        setGameState('question');
        generateQuestion();
      }, 2500);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (gameState !== 'question') return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correct;

    if (isCorrect) {
      setGameState('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);

      const basePoints = currentMoneyValue / 1000;
      const difficultyMultiplier = getDifficultyMultiplier();
      const streakBonus = newStreak * 10;
      const totalPoints = Math.floor((basePoints + streakBonus) * difficultyMultiplier);

      setScore(prev => prev + totalPoints);
      setCurrentMoneyValue(prev => moneyValues[Math.min(moneyValues.indexOf(prev) + 1, moneyValues.length - 1)]);

      onScore(totalPoints);
      onProgress('experiments'); // Using experiments for quiz progress

      if (settings.soundEnabled) {
        soundEffects.playSuccess();
      }

      setTimeout(() => {
        generateQuestion();
      }, 2500);
    } else {
      setGameState('incorrect');
      setStreak(0);

      if (settings.soundEnabled) {
        soundEffects.playError();
      }

      setTimeout(() => {
        setGameState('question');
        generateQuestion();
      }, 3000);
    }
  };

  const OptionButton = ({ option, index, isCorrect, isSelected }) => {
    let backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    if (gameState !== 'question') {
      if (isCorrect) {
        backgroundColor = 'linear-gradient(135deg, #4CAF50, #45a049)';
      } else if (isSelected) {
        backgroundColor = 'linear-gradient(135deg, #f44336, #d32f2f)';
      } else {
        backgroundColor = 'linear-gradient(135deg, #9e9e9e, #757575)';
      }
    }

    return (
      <motion.button
        className={`quiz-option ${isSelected ? 'selected' : ''}`}
        onClick={() => handleAnswerSelect(index)}
        disabled={gameState !== 'question'}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={gameState === 'question' ? { scale: 1.02 } : {}}
        whileTap={gameState === 'question' ? { scale: 0.98 } : {}}
        style={{
          background: backgroundColor,
          color: 'white',
          border: 'none',
          borderRadius: '15px',
          padding: '15px 20px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: gameState === 'question' ? 'pointer' : 'default',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          width: '100%',
          textAlign: 'left',
          margin: '8px 0',
          transform: isSelected && gameState === 'question' ? 'scale(1.02)' : 'scale(1)'
        }}
      >
        {option}
      </motion.button>
    );
  };

  return (
    <div className="quiz-game-container">
      <button className="back-button" onClick={() => onNavigate('menu')}>
        ← Back to Menu
      </button>

      <div className="quiz-header">
        <motion.div
          className="money-display"
          key={currentMoneyValue}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="money-icon">$</div>
          <div className="money-amount">{currentMoneyValue.toLocaleString()}</div>
        </motion.div>

        <div className="quiz-stats">
          <p>Score: {score.toLocaleString()} points</p>
          <p>Streak: {streak} 🔥</p>
          <p>Difficulty: {settings.difficulty}</p>
        </div>

        <div className="timer-toggle">
          <button
            onClick={() => setUseTimer(!useTimer)}
            className={useTimer ? 'active' : ''}
          >
            {useTimer ? '⏰ Timer ON' : '⏱️ Timer OFF'}
          </button>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-section">
          <motion.div
            className="question-card"
            key={currentQuestion.question}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{currentQuestion.question}</h2>
            {useTimer && gameState === 'question' && (
              <div className="timer">
                <div className="timer-bar">
                  <motion.div
                    className="timer-progress"
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / 30) * 100}%` }}
                    transition={{ duration: 0.1 }}
                    style={{
                      background: timeLeft > 10 ? '#4CAF50' : timeLeft > 5 ? '#ff9800' : '#f44336'
                    }}
                  />
                </div>
                <div className="timer-text">{timeLeft}s</div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="options-section">
          <AnimatePresence mode="wait">
            {gameState === 'question' && (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="options-container"
              >
                {currentQuestion.options?.map((option, index) => (
                  <OptionButton
                    key={index}
                    option={option}
                    index={index}
                    isCorrect={index === currentQuestion.correct}
                    isSelected={selectedAnswer === index}
                  />
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
                <h3>Correct!</h3>
                <p>Great job! You earned ${currentMoneyValue.toLocaleString()}!</p>
                <div className="streak-celebration">
                  🔥 Streak: {streak} 🔥
                </div>
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
                <p>The correct answer was: {currentQuestion.options?.[currentQuestion.correct]}</p>
                <p>Keep trying, you'll get the next one!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="quiz-footer">
        <div className="money-scale">
          <p>Next prize:</p>
          <div className="money-scale-values">
            {moneyValues.map((value, index) => (
              <div
                key={value}
                className={`money-scale-item ${value === currentMoneyValue ? 'current' : ''} ${value < currentMoneyValue ? 'passed' : ''}`}
              >
                ${value.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .quiz-game-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }

        .quiz-header {
          margin-bottom: 30px;
        }

        .money-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .money-icon {
          font-size: 2rem;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .money-amount {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .quiz-stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .timer-toggle {
          margin-top: 15px;
        }

        .timer-toggle button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .timer-toggle button.active {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .quiz-content {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(10px);
          margin-bottom: 30px;
        }

        .question-section {
          margin-bottom: 30px;
        }

        .question-card {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .question-card h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: white;
        }

        .timer {
          margin-top: 20px;
        }

        .timer-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .timer-progress {
          height: 100%;
          border-radius: 4px;
          transition: width 0.1s linear;
        }

        .timer-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
        }

        .options-section {
          min-height: 300px;
        }

        .options-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .quiz-option {
          transition: all 0.3s ease;
        }

        .quiz-option:disabled {
          cursor: not-allowed !important;
        }

        .feedback {
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          max-width: 500px;
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

        .streak-celebration {
          margin-top: 15px;
          font-size: 1.2rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 10px;
          border-radius: 10px;
        }

        .quiz-footer {
          margin-top: 30px;
        }

        .money-scale {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 20px;
        }

        .money-scale p {
          margin-bottom: 15px;
          font-size: 1.1rem;
        }

        .money-scale-values {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .money-scale-item {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .money-scale-item.current {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #333;
          transform: scale(1.1);
        }

        .money-scale-item.passed {
          opacity: 0.6;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 10px 15px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default QuizGame;
