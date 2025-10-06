import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParticleEffect = ({ trigger, type = 'stars' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: type === 'stars' ? '⭐' : '✨',
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5
      }));
      setParticles(newParticles);
      
      setTimeout(() => setParticles([]), 2000);
    }
  }, [trigger, type]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9998 }}>
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ x: particle.x, y: particle.y, scale: 0, rotate: 0, opacity: 1 }}
            animate={{ 
              y: particle.y - 200,
              scale: particle.scale,
              rotate: particle.rotation,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ position: 'absolute', fontSize: '2rem' }}
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ParticleEffect;