import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AvatarModal from './AvatarModal';

const AvatarInventory = ({ onNavigate, currentAvatar, onSelectAvatar, userLevel }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [viewMode, setViewMode] = useState('select'); // 'select' or 'view'
  const [viewingAvatar, setViewingAvatar] = useState(null); // for modal view

  const avatarCollection = [
    { id: 1, src: '/avatars/ChatGPT Image Oct 6, 2025, 06_20_06 PM.png', unlockLevel: 1, name: 'Starter' },
    { id: 2, src: '/avatars/Gemini_Generated_Image_6nfdgf6nfdgf6nfd.png', unlockLevel: 2, name: 'Explorer' },
    { id: 3, src: '/avatars/Gemini_Generated_Image_8mgk6r8mgk6r8mgk.png', unlockLevel: 3, name: 'Scholar' },
    { id: 4, src: '/avatars/Gemini_Generated_Image_azdnu6azdnu6azdn.png', unlockLevel: 5, name: 'Genius' },
    { id: 5, src: '/avatars/Gemini_Generated_Image_f9aieuf9aieuf9ai.png', unlockLevel: 7, name: 'Master' },
    { id: 6, src: '/avatars/Gemini_Generated_Image_fav899fav899fav8.png', unlockLevel: 10, name: 'Champion' },
    { id: 7, src: '/avatars/Gemini_Generated_Image_klk96nklk96nklk9.png', unlockLevel: 12, name: 'Hero' },
    { id: 8, src: '/avatars/Gemini_Generated_Image_obuqizobuqizobuq.png', unlockLevel: 15, name: 'Legend' },
    { id: 9, src: '/avatars/Gemini_Generated_Image_omsp12omsp12omsp.png', unlockLevel: 18, name: 'Mythic' },
    { id: 10, src: '/avatars/Gemini_Generated_Image_pbmuzhpbmuzhpbmu.png', unlockLevel: 20, name: 'Ultimate' },
    { id: 11, src: '/avatars/Gemini_Generated_Image_rugjydrugjydrugj.png', unlockLevel: 25, name: 'Supreme' }
  ];

  const handleAvatarSelect = (avatar) => {
    if (userLevel >= avatar.unlockLevel) {
      setSelectedAvatar(avatar.src);
    }
  };

  const handleConfirm = () => {
    onSelectAvatar(selectedAvatar);
    onNavigate('menu');
  };

  return (
    <motion.div 
      className="game-container"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🎒 Avatar Collection</h2>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
        Level {userLevel} • Unlock new avatars by leveling up!
      </p>

      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <button
          onClick={() => setViewMode('select')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: viewMode === 'select' ? '3px solid #667eea' : '2px solid #ccc',
            background: viewMode === 'select' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
            color: viewMode === 'select' ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✏️ Select Avatar
        </button>
        <button
          onClick={() => setViewMode('view')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: viewMode === 'view' ? '3px solid #667eea' : '2px solid #ccc',
            background: viewMode === 'view' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
            color: viewMode === 'view' ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          👁️ View All
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {avatarCollection.map((avatar) => {
          const isUnlocked = userLevel >= avatar.unlockLevel;
          const isSelected = selectedAvatar === avatar.src;
          
          return (
            <motion.div
              key={avatar.id}
              onClick={() => setViewingAvatar(avatar)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '20px',
                borderRadius: '20px',
                border: (isSelected && viewMode === 'select') ? '4px solid #667eea' : '2px solid #ddd',
                background: (isSelected && viewMode === 'select') 
                  ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))' 
                  : 'white',
                cursor: 'pointer',
                position: 'relative',
                opacity: isUnlocked ? 1 : 0.5,
                boxShadow: (isSelected && viewMode === 'select') 
                  ? '0 8px 25px rgba(102, 126, 234, 0.3)' 
                  : '0 4px 10px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              <img 
                src={avatar.src} 
                alt={avatar.name}
                style={{ 
                  width: '60px', 
                  height: '60px', 
                  objectFit: 'contain',
                  borderRadius: '8px',
                  filter: isUnlocked ? 'none' : 'grayscale(100%)'
                }} 
              />
              
              <h4 style={{ 
                margin: '10px 0 5px 0', 
                color: isUnlocked ? '#333' : '#999',
                fontSize: '1rem'
              }}>
                {avatar.name}
              </h4>
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: isUnlocked ? '#667eea' : '#999',
                margin: 0
              }}>
                Level {avatar.unlockLevel}
              </p>

              {!isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '2rem'
                }}>
                  🔒
                </div>
              )}

              {isSelected && viewMode === 'select' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#28a745',
                    borderRadius: '50%',
                    width: '25px',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {viewMode === 'select' && (
        <motion.button
          onClick={handleConfirm}
          disabled={selectedAvatar === currentAvatar}
          whileHover={selectedAvatar !== currentAvatar ? { scale: 1.05 } : {}}
          whileTap={selectedAvatar !== currentAvatar ? { scale: 0.95 } : {}}
          style={{
            fontSize: '1.5rem',
            padding: '15px 40px',
            borderRadius: '15px',
            border: 'none',
            background: selectedAvatar !== currentAvatar 
              ? 'linear-gradient(135deg, #667eea, #764ba2)' 
              : '#ccc',
            color: 'white',
            cursor: selectedAvatar !== currentAvatar ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            boxShadow: selectedAvatar !== currentAvatar ? '0 8px 25px rgba(102, 126, 234, 0.4)' : 'none'
          }}
        >
          {selectedAvatar === currentAvatar ? 'Current Avatar' : 'Use This Avatar'}
        </motion.button>
      )}

      {viewMode === 'view' && (
        <div style={{ textAlign: 'center', padding: '20px', background: '#e3f2fd', borderRadius: '15px', marginBottom: '20px' }}>
          <h3 style={{ color: '#1976d2', marginBottom: '10px' }}>👁️ Viewing All Avatars</h3>
          <p style={{ color: '#1976d2', margin: 0 }}>You can see all avatars here. Unlock more by leveling up!</p>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '15px' }}>
        <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🏆 Unlock Progress</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {avatarCollection.map((avatar) => (
            <div
              key={avatar.id}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                background: userLevel >= avatar.unlockLevel ? '#d4edda' : '#f8d7da',
                color: userLevel >= avatar.unlockLevel ? '#155724' : '#721c24',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}
            >
              {avatar.name}: Level {avatar.unlockLevel} {userLevel >= avatar.unlockLevel ? '✓' : '🔒'}
            </div>
          ))}
        </div>
      </div>

      <AvatarModal
        isOpen={!!viewingAvatar}
        onClose={() => setViewingAvatar(null)}
        avatar={viewingAvatar}
        userLevel={userLevel}
        onSelect={handleAvatarSelect}
      />
    </motion.div>
  );
};

export default AvatarInventory;
