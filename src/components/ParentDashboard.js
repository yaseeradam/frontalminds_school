import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ParentDashboard = ({ onNavigate, progress, settings, onSettingsChange }) => {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [timeLimit, setTimeLimit] = useState(settings.timeLimit || 30);

  const handleUnlock = () => {
    if (password === '1234') {
      setUnlocked(true);
    } else {
      alert('Incorrect password! Default is 1234');
    }
  };

  const handleSave = () => {
    onSettingsChange({ ...settings, timeLimit });
    alert('Settings saved!');
  };

  if (!unlocked) {
    return (
      <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
        
        <h2>👨‍👩‍👧 Parent Dashboard</h2>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>Enter password to access</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
          style={{
            fontSize: '1.5rem',
            padding: '15px',
            borderRadius: '10px',
            border: '3px solid #ddd',
            textAlign: 'center',
            width: '250px',
            margin: '20px 0'
          }}
          placeholder="Password"
        />

        <motion.button
          onClick={handleUnlock}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontSize: '1.2rem',
            padding: '15px 30px',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Unlock
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back to Menu</button>
      
      <h2>👨‍👩‍👧 Parent Dashboard</h2>

      <div style={{ textAlign: 'left', maxWidth: '600px', margin: '30px auto' }}>
        <div className="stat-card" style={{ marginBottom: '20px' }}>
          <h3>📊 Progress Summary</h3>
          <p>Total Score: <strong>{progress.totalScore}</strong></p>
          <p>Math Problems Solved: <strong>{progress.mathProblems}</strong></p>
          <p>Words Spelled: <strong>{progress.wordsSpelled}</strong></p>
          <p>Achievements Unlocked: <strong>{progress.achievements.length}</strong></p>
        </div>

        <div className="stat-card" style={{ marginBottom: '20px' }}>
          <h3>⏱️ Time Limit (minutes per day)</h3>
          <input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
            style={{
              fontSize: '1.2rem',
              padding: '10px',
              borderRadius: '5px',
              border: '2px solid #ddd',
              width: '100px',
              margin: '10px 0'
            }}
          />
        </div>

        <div className="stat-card">
          <h3>🔒 Difficulty Lock</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={settings.difficultyLocked}
              onChange={(e) => onSettingsChange({ ...settings, difficultyLocked: e.target.checked })}
              style={{ transform: 'scale(1.5)' }}
            />
            Lock difficulty at current level
          </label>
        </div>

        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontSize: '1.2rem',
            padding: '15px 30px',
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '20px',
            width: '100%'
          }}
        >
          Save Settings
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ParentDashboard;