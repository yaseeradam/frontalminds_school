import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Settings = ({ onNavigate, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const themes = [
    { id: 'default', name: 'Ocean Blue', colors: ['#667eea', '#764ba2'] },
    { id: 'sunset', name: 'Sunset', colors: ['#ff6b6b', '#feca57'] },
    { id: 'forest', name: 'Forest', colors: ['#06ffa5', '#00d4aa'] },
    { id: 'purple', name: 'Purple Dream', colors: ['#a8edea', '#fed6e3'] }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
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
      
      <h2>⚙️ Settings</h2>

      <div className="settings-section">
        <h3>🎨 Theme</h3>
        <div className="theme-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '15px',
          margin: '20px 0'
        }}>
          {themes.map(theme => (
            <motion.button
              key={theme.id}
              className={`theme-button ${localSettings.theme === theme.id ? 'selected' : ''}`}
              onClick={() => handleSettingChange('theme', theme.id)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '20px',
                borderRadius: '10px',
                border: localSettings.theme === theme.id ? '3px solid #333' : '2px solid #ccc',
                background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {theme.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>🔊 Sound Effects</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
          <input
            type="checkbox"
            checked={localSettings.soundEnabled}
            onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
            style={{ transform: 'scale(1.5)' }}
          />
          Enable Sound Effects
        </label>
      </div>

      <div className="settings-section">
        <h3>🗣️ Voice Reader</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
          <input
            type="checkbox"
            checked={localSettings.voiceEnabled}
            onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
            style={{ transform: 'scale(1.5)' }}
          />
          Enable Question Voice Reader
        </label>
      </div>

      <div className="settings-section">
        <h3>🌙 Dark Mode</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
          <input
            type="checkbox"
            checked={localSettings.darkMode}
            onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
            style={{ transform: 'scale(1.5)' }}
          />
          Enable Dark Mode
        </label>
      </div>

      <div className="settings-section">
        <h3>✨ Background Animation</h3>
        <select
          value={localSettings.backgroundAnimation}
          onChange={(e) => handleSettingChange('backgroundAnimation', e.target.value)}
          style={{
            fontSize: '1.2rem',
            padding: '10px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            width: '200px'
          }}
        >
          <option value="stars">Stars</option>
          <option value="bubbles">Bubbles</option>
          <option value="clouds">Clouds</option>
          <option value="hearts">Hearts</option>
        </select>
      </div>

      <div className="settings-section">
        <h3>⏱️ Game Timer</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
          <input
            type="checkbox"
            checked={localSettings.timerEnabled}
            onChange={(e) => handleSettingChange('timerEnabled', e.target.checked)}
            style={{ transform: 'scale(1.5)' }}
          />
          Enable Timer Challenges
        </label>
      </div>

      <div className="settings-section">
        <h3>📊 Difficulty Level</h3>
        <select
          value={localSettings.difficulty}
          onChange={(e) => handleSettingChange('difficulty', e.target.value)}
          style={{
            fontSize: '1.2rem',
            padding: '10px',
            borderRadius: '5px',
            border: '2px solid #ccc',
            width: '200px'
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </motion.div>
  );
};

export default Settings;