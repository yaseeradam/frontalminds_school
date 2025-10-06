import React, { useEffect } from 'react';

const DarkMode = ({ enabled }) => {
  useEffect(() => {
    if (enabled) {
      document.body.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
      document.body.style.color = '#fff';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      document.body.style.color = '#333';
    }
  }, [enabled]);

  return null;
};

export default DarkMode;