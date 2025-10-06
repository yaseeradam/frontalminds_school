import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HintSystem = ({ hint, onUseHint }) => {
  const [hintsLeft, setHintsLeft] = useState(3);
  const [showHint, setShowHint] = useState(false);

  const handleUseHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft(prev => prev - 1);
      setShowHint(true);
      onUseHint();
      setTimeout(() => setShowHint(false), 5000);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <motion.button
        onClick={handleUseHint}
        disabled={hintsLeft === 0}
        whileHover={hintsLeft > 0 ? { scale: 1.05 } : {}}
        whileTap={hintsLeft > 0 ? { scale: 0.95 } : {}}
        style={{
          padding: '10px 20px',
          borderRadius: '10px',
          border: 'none',
          background: hintsLeft > 0 ? 'linear-gradient(135deg, #48dbfb, #0abde3)' : '#ccc',
          color: 'white',
          cursor: hintsLeft > 0 ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        💡 Hint ({hintsLeft} left)
      </motion.button>

      {showHint && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            marginTop: '15px',
            padding: '15px',
            background: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '10px',
            color: '#856404',
            fontSize: '1.1rem'
          }}
        >
          💡 {hint}
        </motion.div>
      )}
    </div>
  );
};

export default HintSystem;