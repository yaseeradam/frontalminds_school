import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const SpellingGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const words = [
    { word: 'cat', hint: '🐱 A furry pet that meows' },
    { word: 'dog', hint: '🐶 A loyal pet that barks' },
    { word: 'sun', hint: '☀️ Bright star in the sky' },
    { word: 'tree', hint: '🌳 Tall plant with leaves' },
    { word: 'book', hint: '📚 You read this' },
    { word: 'fish', hint: '🐟 Swims in water' },
    { word: 'bird', hint: '🐦 Flies in the sky' },
    { word: 'house', hint: '🏠 Where you live' },
    { word: 'apple', hint: '🍎 Red fruit' },
    { word: 'flower', hint: '🌸 Pretty and colorful' }
  ];

  const [currentWord, setCurrentWord] = useState({});
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const generateQuestion = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word.word));
    setUserInput('');
    setFeedback('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const speakWord = () => {
    if (!settings.voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    const isCorrect = userInput.toLowerCase() === currentWord.word.toLowerCase();
    
    if (isCorrect) {
      setFeedback('🎉 Perfect spelling!');
      setStreak(prev => prev + 1);
      onScore(15 + streak * 3);
      onProgress('wordsSpelled');
      
      if (settings.soundEnabled) {
        soundEffects.playSuccess();
      }
      
      setTimeout(() => generateQuestion(), 1500);
    } else {
      setFeedback(`😊 Try again! The word is "${currentWord.word}"`);
      setStreak(0);
      
      if (settings.soundEnabled) {
        soundEffects.playError();
      }
      
      setTimeout(() => generateQuestion(), 2500);
    }
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
      
      <h2>📚 Spelling Adventure!</h2>
      <p>Streak: {streak} 🔥</p>

      <motion.div className="spelling-challenge">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <div style={{ fontSize: '2rem', margin: '20px 0' }}>
            {currentWord.hint}
          </div>
          {settings.voiceEnabled && (
            <button onClick={speakWord} style={{ fontSize: '2rem', padding: '10px 15px', borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', cursor: 'pointer', width: '60px', height: '60px' }} title="Hear the word">
              🔊
            </button>
          )}
        </div>
        
        <div style={{ fontSize: '1.5rem', margin: '20px 0', color: '#666' }}>
          Unscramble: <strong>{scrambledWord}</strong>
        </div>

        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            fontSize: '2rem',
            padding: '15px',
            borderRadius: '10px',
            border: '3px solid #ddd',
            textAlign: 'center',
            width: '300px',
            margin: '20px 0'
          }}
          placeholder="Type the word"
        />

        <motion.button
          onClick={handleSubmit}
          disabled={!userInput}
          className="submit-button"
          whileHover={userInput ? { scale: 1.05 } : {}}
          whileTap={userInput ? { scale: 0.95 } : {}}
        >
          Check Spelling! ✨
        </motion.button>

        {feedback && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`feedback ${feedback.includes('Perfect') ? 'correct' : 'incorrect'}`}
          >
            {feedback}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SpellingGame;