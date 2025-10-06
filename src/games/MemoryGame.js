import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const MemoryGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const cardEmojis = ['🐱', '🐶', '🐸', '🦋', '🌟', '🎈', '🍎', '🌈'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setMatchedCards(prev => [...prev, first, second]);
        onScore(25);
        setFlippedCards([]);
        
        if (settings.soundEnabled) {
          soundEffects.playSuccess();
        }
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
        
        if (settings.soundEnabled) {
          soundEffects.playError();
        }
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards, onScore]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };

  const isGameComplete = matchedCards.length === cards.length;
  
  useEffect(() => {
    if (isGameComplete && matchedCards.length > 0) {
      onProgress('memoryGames');
      if (settings.soundEnabled) {
        soundEffects.playAchievement();
      }
    }
  }, [isGameComplete, matchedCards.length, onProgress, settings.soundEnabled]);

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
      
      <h2>🧠 Memory Match!</h2>
      <p>Moves: {moves}</p>

      {isGameComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="victory-message"
          style={{
            fontSize: '2rem',
            color: '#28a745',
            margin: '20px 0',
            fontWeight: 'bold'
          }}
        >
          🎉 Congratulations! You won in {moves} moves!
        </motion.div>
      )}

      <div className="memory-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="memory-card"
            onClick={() => handleCardClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: flippedCards.includes(index) || matchedCards.includes(index) 
                ? '#fff' : '#4a90e2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              cursor: 'pointer',
              border: '3px solid #333',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            {(flippedCards.includes(index) || matchedCards.includes(index)) 
              ? card.emoji 
              : '❓'
            }
          </motion.div>
        ))}
      </div>

      <button 
        onClick={initializeGame}
        className="reset-button"
        style={{
          marginTop: '20px',
          padding: '15px 30px',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}
      >
        🔄 New Game
      </button>
    </motion.div>
  );
};

export default MemoryGame;