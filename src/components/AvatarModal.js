import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AvatarModal = ({ isOpen, onClose, avatar, userLevel }) => {
  if (!avatar) return null;

  const isUnlocked = userLevel >= avatar.unlockLevel;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '500px',
              width: '90%',
              cursor: 'default',
              zIndex: 1001,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Avatar image - exactly 200x200px */}
            <motion.img
              src={avatar.src}
              alt={avatar.name}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                borderRadius: '15px',
                marginBottom: '25px',
                border: `3px solid ${isUnlocked ? '#28a745' : '#dc3545'}`,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
            />

            {/* Avatar name */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                color: '#667eea',
                marginBottom: '10px',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {avatar.name}
            </motion.h2>

            {/* Unlock level */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                color: '#666',
                fontSize: '1.3rem',
                marginBottom: '15px',
                fontWeight: '500'
              }}
            >
              Level {avatar.unlockLevel}
            </motion.p>

            {/* Lock status */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: isUnlocked ? '#28a745' : '#dc3545'
              }}
            >
              {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
            </motion.div>

            {/* Close button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 35px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              Close
            </motion.button>

            {/* Additional info for locked avatars */}
            {!isUnlocked && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  marginTop: '20px',
                  color: '#dc3545',
                  fontSize: '1rem',
                  fontStyle: 'italic'
                }}
              >
                Reach level {avatar.unlockLevel} to unlock this avatar!
              </motion.p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AvatarModal;
