import React from 'react';
import { motion } from 'framer-motion';

const PrintCertificate = ({ name, achievement, date, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

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
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          padding: '60px',
          borderRadius: '20px',
          maxWidth: '800px',
          textAlign: 'center',
          border: '10px double #667eea',
          position: 'relative'
        }}
        className="certificate"
      >
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏆</div>
        <h1 style={{ fontSize: '3rem', color: '#667eea', marginBottom: '20px', fontFamily: 'cursive' }}>
          Certificate of Achievement
        </h1>
        
        <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>This certifies that</p>
        
        <h2 style={{ fontSize: '2.5rem', color: '#ff6b6b', margin: '20px 0', fontFamily: 'cursive' }}>
          {name}
        </h2>
        
        <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>has successfully completed</p>
        
        <h3 style={{ fontSize: '2rem', color: '#28a745', margin: '20px 0' }}>
          {achievement}
        </h3>
        
        <p style={{ fontSize: '1.2rem', margin: '40px 0', color: '#666' }}>
          Date: {date}
        </p>
        
        <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              borderRadius: '10px',
              border: 'none',
              background: '#28a745',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🖨️ Print
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '15px 30px',
              fontSize: '1.2rem',
              borderRadius: '10px',
              border: 'none',
              background: '#6c757d',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrintCertificate;