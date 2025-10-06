import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MultipleProfiles = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState([]);
  const [newName, setNewName] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userProfiles');
    if (saved) {
      setProfiles(JSON.parse(saved));
    }
  }, []);

  const addProfile = () => {
    if (newName.trim()) {
      const newProfile = {
        id: Date.now(),
        name: newName,
        avatar: ['😊', '🤓', '😎', '🥳', '🤩'][Math.floor(Math.random() * 5)],
        createdAt: new Date().toISOString()
      };
      const updated = [...profiles, newProfile];
      setProfiles(updated);
      localStorage.setItem('userProfiles', JSON.stringify(updated));
      setNewName('');
      setShowAdd(false);
    }
  };

  const deleteProfile = (id) => {
    if (window.confirm('Delete this profile?')) {
      const updated = profiles.filter(p => p.id !== id);
      setProfiles(updated);
      localStorage.setItem('userProfiles', JSON.stringify(updated));
    }
  };

  return (
    <motion.div className="game-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <h2>👥 Choose Profile</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', margin: '30px 0' }}>
        {profiles.map(profile => (
          <motion.div
            key={profile.id}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: '30px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}
            onClick={() => onSelectProfile(profile)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); deleteProfile(profile.id); }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#dc3545',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ×
            </button>
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{profile.avatar}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{profile.name}</div>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAdd(true)}
          style={{
            padding: '30px',
            borderRadius: '20px',
            border: '3px dashed #667eea',
            background: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <div style={{ fontSize: '4rem' }}>➕</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>Add Profile</div>
        </motion.div>
      </div>

      {showAdd && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '15px' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addProfile()}
            placeholder="Enter name..."
            style={{ fontSize: '1.2rem', padding: '10px', borderRadius: '10px', border: '2px solid #ddd', width: '300px', marginRight: '10px' }}
          />
          <button onClick={addProfile} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer', fontSize: '1rem', marginRight: '10px' }}>
            Add
          </button>
          <button onClick={() => setShowAdd(false)} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#6c757d', color: 'white', cursor: 'pointer', fontSize: '1rem' }}>
            Cancel
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MultipleProfiles;