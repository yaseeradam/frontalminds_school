import React from 'react';
import { motion } from 'framer-motion';

const Progress = ({ onNavigate, progress }) => {
  const achievements = [
    { id: 'first_correct', name: 'First Success!', emoji: '🌟', description: 'Got your first answer right!' },
    { id: 'streak_5', name: 'Hot Streak!', emoji: '🔥', description: 'Got 5 answers in a row!' },
    { id: 'math_master', name: 'Math Master', emoji: '🧮', description: 'Solved 50 math problems!' },
    { id: 'word_wizard', name: 'Word Wizard', emoji: '📚', description: 'Spelled 25 words correctly!' },
    { id: 'scientist', name: 'Little Scientist', emoji: '🔬', description: 'Completed 10 experiments!' },
    { id: 'memory_champion', name: 'Memory Champion', emoji: '🧠', description: 'Won 10 memory games!' },
    { id: 'typing_master', name: 'Typing Master', emoji: '⌨️', description: 'Typed 30 words correctly!' },
    { id: 'shape_expert', name: 'Shape Expert', emoji: '🔷', description: 'Identified 20 shapes!' },
    { id: 'counting_star', name: 'Counting Star', emoji: '⭐', description: 'Counted 25 groups!' }
  ];

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
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
      
      <h2>📊 Your Progress</h2>

      <div className="stats-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        margin: '30px 0'
      }}>
        <div className="stat-card">
          <h3>🎯 Total Score</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            {progress.totalScore}
          </div>
        </div>

        <div className="stat-card">
          <h3>🔢 Math Problems</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {progress.mathProblems}
          </div>
        </div>

        <div className="stat-card">
          <h3>📝 Words Spelled</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6f42c1' }}>
            {progress.wordsSpelled}
          </div>
        </div>

        <div className="stat-card">
          <h3>🔬 Experiments</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fd7e14' }}>
            {progress.experiments}
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h3>🏆 Achievements</h3>
        <div className="achievements-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          margin: '20px 0'
        }}>
          {achievements.map(achievement => {
            const isUnlocked = progress.achievements.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                initial={{ scale: 0.9, opacity: 0.7 }}
                animate={{ 
                  scale: isUnlocked ? 1 : 0.9, 
                  opacity: isUnlocked ? 1 : 0.5 
                }}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  border: isUnlocked ? '3px solid #28a745' : '2px solid #ccc',
                  backgroundColor: isUnlocked ? '#d4edda' : '#f8f9fa',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                  {achievement.emoji}
                </div>
                <h4 style={{ color: isUnlocked ? '#155724' : '#6c757d' }}>
                  {achievement.name}
                </h4>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: isUnlocked ? '#155724' : '#6c757d',
                  margin: '5px 0' 
                }}>
                  {achievement.description}
                </p>
                {isUnlocked && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#28a745', 
                    fontWeight: 'bold' 
                  }}>
                    ✅ UNLOCKED!
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="high-scores">
        <h3>🥇 High Scores</h3>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <div>Best Math Streak: <strong>{progress.bestMathStreak}</strong></div>
          <div>Best Spelling Streak: <strong>{progress.bestSpellingStreak}</strong></div>
          <div>Fastest Memory Game: <strong>{progress.fastestMemory}s</strong></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Progress;