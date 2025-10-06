import React from 'react';
import { motion } from 'framer-motion';

const LevelSystem = ({ totalScore }) => {
  const level = Math.floor(totalScore / 500) + 1;
  const currentLevelScore = totalScore % 500;
  const progress = (currentLevelScore / 500) * 100;
  const nextLevelScore = 500 - currentLevelScore;

  return (
    <div style={{ position: 'fixed', top: '100px', right: '20px', background: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0,0,0,0.2)', minWidth: '200px', zIndex: 100 }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <div style={{ fontSize: '3rem' }}>⭐</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>Level {level}</div>
      </div>
      
      <div style={{ background: '#e9ecef', borderRadius: '10px', height: '20px', overflow: 'hidden', marginBottom: '10px' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: '10px' }}
        />
      </div>
      
      <div style={{ fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
        {nextLevelScore} points to Level {level + 1}
      </div>
    </div>
  );
};

export default LevelSystem;