import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DailyChallenges = ({ onNavigate, progress, onComplete }) => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('challengeDate');
    
    if (savedDate !== today) {
      const newChallenges = [
        { id: 1, title: 'Math Master', description: 'Solve 10 math problems', target: 10, current: 0, reward: 100, icon: '🔢' },
        { id: 2, title: 'Word Wizard', description: 'Spell 5 words correctly', target: 5, current: 0, reward: 75, icon: '📚' },
        { id: 3, title: 'Memory Champion', description: 'Win 3 memory games', target: 3, current: 0, reward: 50, icon: '🧠' }
      ];
      setChallenges(newChallenges);
      localStorage.setItem('challengeDate', today);
      localStorage.setItem('dailyChallenges', JSON.stringify(newChallenges));
    } else {
      const saved = localStorage.getItem('dailyChallenges');
      if (saved) setChallenges(JSON.parse(saved));
    }
  }, []);

  const updateChallenge = (id, increment) => {
    const updated = challenges.map(c => {
      if (c.id === id && c.current < c.target) {
        const newCurrent = Math.min(c.current + increment, c.target);
        if (newCurrent === c.target && c.current !== c.target) {
          onComplete(c.reward);
        }
        return { ...c, current: newCurrent };
      }
      return c;
    });
    setChallenges(updated);
    localStorage.setItem('dailyChallenges', JSON.stringify(updated));
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <h2>🎯 Daily Challenges</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>Complete challenges for bonus points!</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {challenges.map(challenge => {
          const progress = (challenge.current / challenge.target) * 100;
          const isComplete = challenge.current >= challenge.target;
          
          return (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: '25px',
                borderRadius: '20px',
                background: isComplete ? 'linear-gradient(135deg, #d4edda, #c3e6cb)' : 'linear-gradient(135deg, #fff, #f8f9fa)',
                border: isComplete ? '3px solid #28a745' : '2px solid #ddd',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <span style={{ fontSize: '3rem' }}>{challenge.icon}</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{challenge.title}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>{challenge.description}</p>
                  <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#667eea' }}>
                    Reward: {challenge.reward} points
                  </p>
                </div>
                {isComplete && <span style={{ fontSize: '2rem' }}>✅</span>}
              </div>
              
              <div style={{ background: '#e9ecef', borderRadius: '10px', height: '20px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%',
                    background: isComplete ? 'linear-gradient(90deg, #28a745, #20c997)' : 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '10px'
                  }}
                />
              </div>
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                {challenge.current} / {challenge.target}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DailyChallenges;