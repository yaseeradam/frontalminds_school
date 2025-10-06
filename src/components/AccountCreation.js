import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AccountCreation = ({ onCreateAccount, existingAvatars }) => {
  const [step, setStep] = useState(1); // 1: name, 2: avatar
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');

  // Only show starter avatars during registration (Level 1-3)
  const starterAvatars = [
    '/avatars/ChatGPT Image Oct 6, 2025, 06_20_06 PM.png',
    '/avatars/Gemini_Generated_Image_6nfdgf6nfdgf6nfd.png',
    '/avatars/Gemini_Generated_Image_8mgk6r8mgk6r8mgk.png'
  ];

  const avatars = starterAvatars;

  const handleNameSubmit = () => {
    if (name.trim().length >= 2) {
      setStep(2);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleCreateAccount = () => {
    if (selectedAvatar) {
      onCreateAccount({
        name: name.trim(),
        avatar: selectedAvatar,
        createdAt: new Date().toISOString()
      });
    }
  };

  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'white',
            padding: '60px',
            borderRadius: '30px',
            textAlign: 'center',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '5rem', marginBottom: '20px' }}
          >
            👋
          </motion.div>

          <h1 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '20px' }}>
            Welcome!
          </h1>

          <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '30px' }}>
            What's your name?
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
            placeholder="Enter your name..."
            autoFocus
            maxLength={20}
            style={{
              fontSize: '1.8rem',
              padding: '20px',
              borderRadius: '15px',
              border: '3px solid #667eea',
              width: '100%',
              textAlign: 'center',
              marginBottom: '30px',
              outline: 'none'
            }}
          />

          <motion.button
            onClick={handleNameSubmit}
            disabled={name.trim().length < 2}
            whileHover={name.trim().length >= 2 ? { scale: 1.05 } : {}}
            whileTap={name.trim().length >= 2 ? { scale: 0.95 } : {}}
            style={{
              fontSize: '1.5rem',
              padding: '20px 50px',
              borderRadius: '15px',
              border: 'none',
              background: name.trim().length >= 2 
                ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                : '#ccc',
              color: 'white',
              cursor: name.trim().length >= 2 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              boxShadow: name.trim().length >= 2 ? '0 8px 25px rgba(102, 126, 234, 0.4)' : 'none'
            }}
          >
            Next →
          </motion.button>

          {name.trim().length > 0 && name.trim().length < 2 && (
            <p style={{ color: '#dc3545', marginTop: '15px', fontSize: '0.9rem' }}>
              Name must be at least 2 characters
            </p>
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (step === 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          overflow: 'auto',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'white',
            padding: '50px',
            borderRadius: '30px',
            textAlign: 'center',
            maxWidth: '800px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <h1 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '10px' }}>
            Hi {name}! 👋
          </h1>

          <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '30px' }}>
            Choose your avatar
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '15px',
            marginBottom: '40px',
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '10px'
          }}>
            {avatars.map((avatar, idx) => {
              const isImage = typeof avatar === 'string' && (avatar.startsWith('/') || avatar.startsWith('http'));
              
              return (
                <motion.div
                  key={idx}
                  onClick={() => handleAvatarSelect(avatar)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    border: selectedAvatar === avatar ? '4px solid #667eea' : '2px solid #ddd',
                    background: selectedAvatar === avatar 
                      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))' 
                      : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedAvatar === avatar 
                      ? '0 8px 25px rgba(102, 126, 234, 0.3)' 
                      : '0 4px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100px'
                  }}
                >
                  {isImage ? (
                    <img 
                      src={avatar} 
                      alt="avatar" 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'contain',
                        borderRadius: '10px'
                      }} 
                    />
                  ) : (
                    <div style={{ fontSize: '4rem' }}>{avatar}</div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <motion.button
              onClick={() => setStep(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: '1.2rem',
                padding: '15px 30px',
                borderRadius: '15px',
                border: '2px solid #667eea',
                background: 'white',
                color: '#667eea',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Back
            </motion.button>

            <motion.button
              onClick={handleCreateAccount}
              disabled={!selectedAvatar}
              whileHover={selectedAvatar ? { scale: 1.05 } : {}}
              whileTap={selectedAvatar ? { scale: 0.95 } : {}}
              style={{
                fontSize: '1.5rem',
                padding: '15px 50px',
                borderRadius: '15px',
                border: 'none',
                background: selectedAvatar 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : '#ccc',
                color: 'white',
                cursor: selectedAvatar ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                boxShadow: selectedAvatar ? '0 8px 25px rgba(102, 126, 234, 0.4)' : 'none'
              }}
            >
              Start Learning! 🚀
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
};

export default AccountCreation;