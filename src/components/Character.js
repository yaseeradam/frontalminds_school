import React from 'react';
import { motion } from 'framer-motion';

const Character = ({ mood = 'happy', message = '', position = 'bottom-right' }) => {
  const characters = {
    happy: '😊',
    excited: '🤩',
    thinking: '🤔',
    celebrating: '🎉',
    encouraging: '👍'
  };

  const messages = {
    happy: "Great job! Keep learning!",
    excited: "Wow! You're amazing!",
    thinking: "Hmm, let me think...",
    celebrating: "Fantastic work!",
    encouraging: "You can do it!"
  };

  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
  };

  return (
    <motion.div
      className="character-mascot"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      style={{
        position: 'fixed',
        ...positionStyles[position],
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '15px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
        maxWidth: '200px',
        textAlign: 'center'
      }}
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        style={{ fontSize: '3rem', marginBottom: '10px' }}
      >
        {characters[mood]}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: '0.9rem',
          color: '#333',
          fontWeight: 'bold',
          lineHeight: '1.3'
        }}
      >
        {message || messages[mood]}
      </motion.div>
    </motion.div>
  );
};

export default Character;