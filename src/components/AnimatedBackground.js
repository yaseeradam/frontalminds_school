import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ type = 'stars' }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setElements(items);
  }, [type]);

  const getEmoji = () => {
    switch (type) {
      case 'stars': return '⭐';
      case 'bubbles': return '🫧';
      case 'clouds': return '☁️';
      case 'hearts': return '💖';
      default: return '⭐';
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {elements.map(el => (
        <motion.div
          key={el.id}
          animate={{
            y: [el.y + '%', (el.y - 20) + '%', el.y + '%'],
            x: [el.x + '%', (el.x + 5) + '%', el.x + '%'],
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            fontSize: `${el.size}px`,
            left: `${el.x}%`,
            top: `${el.y}%`
          }}
        >
          {getEmoji()}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;