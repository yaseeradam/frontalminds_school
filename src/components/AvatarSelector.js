import React from 'react';
import { motion } from 'framer-motion';

const AvatarSelector = ({ onNavigate, selectedAvatar, onSelectAvatar }) => {
  const avatars = [
    '😊', '🤓', '😎', '🥳', '🤩', '😇', '🦸', '🧙', '🦄', '🐱', '🐶', '🐼', '🦊', '🐸', '🦋', '🌟'
  ];

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <h2>👤 Choose Your Avatar!</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>Pick your favorite character</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {avatars.map((avatar, idx) => (
          <motion.button
            key={idx}
            onClick={() => onSelectAvatar(avatar)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: '3rem',
              padding: '20px',
              borderRadius: '20px',
              border: selectedAvatar === avatar ? '4px solid #667eea' : '2px solid #ddd',
              background: selectedAvatar === avatar ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
              cursor: 'pointer',
              boxShadow: selectedAvatar === avatar ? '0 8px 25px rgba(102, 126, 234, 0.4)' : '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            {avatar}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default AvatarSelector;