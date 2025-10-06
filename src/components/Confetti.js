import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Confetti = ({ show, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#06ffa5'][Math.floor(Math.random() * 5)],
        rotation: Math.random() * 360,
        size: Math.random() * 10 + 5
      }));
      setParticles(newParticles);
      
      setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 3000);
    }
  }, [show, onComplete]);

  if (!show || particles.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, rotate: 0, opacity: 1 }}
          animate={{ 
            y: window.innerHeight + 100,
            x: particle.x + (Math.random() - 0.5) * 200,
            rotate: particle.rotation + 720,
            opacity: 0
          }}
          transition={{ duration: 2 + Math.random(), ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;