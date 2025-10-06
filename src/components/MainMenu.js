import React from 'react';
import { motion } from 'framer-motion';

const MainMenu = ({ onNavigate }) => {
  const [lastSpoken, setLastSpoken] = React.useState(null);

  const speakTitle = (title) => {
    if (lastSpoken === title) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
    setLastSpoken(title);
  };

  const menuItems = [
    { id: 'visual-addition', title: 'Addition Fun', description: 'Learn addition with balloons!', icon: 'addition.png' },
    { id: 'visual-subtraction', title: 'Subtraction Fun', description: 'Learn subtraction with apples!', icon: 'subtraction.png' },
    { id: 'quiz-game', title: 'Quiz Challenge', description: 'Answer questions for prizes!', icon: 'quiz_challenge.png' },
    { id: 'math', title: 'Math Adventure', description: 'Classic math problems!', icon: 'math_adventure.png' },
    { id: 'spelling', title: 'Spelling Game', description: 'Spell words correctly!', icon: 'speeling.png' },
    { id: 'memory', title: 'Memory Match', description: 'Test your memory skills!', icon: 'memory_match.png' },
    { id: 'typing', title: 'Typing Challenge', description: 'Practice your typing!', icon: 'typing_challenge.png' },
    { id: 'shapes', title: 'Shape Recognition', description: 'Learn shapes!', icon: 'shapes.png' },
    { id: 'counting', title: 'Counting Fun', description: 'Count objects!', icon: 'counting_fun.png' },
    { id: 'fractions', title: 'Fractions', description: 'Learn fractions with pizza!', icon: 'fractions.png' },
    { id: 'clock', title: 'Clock Reading', description: 'Tell the time!', icon: 'clock_reading.png' },
    { id: 'money', title: 'Money Master', description: 'Count coins and make change!', icon: 'master_money.png' },
    { id: 'comparison', title: 'Greater or Less', description: 'Compare numbers!', icon: 'compare_master.png' },
    { id: 'solar-system', title: 'Solar System', description: 'Explore planets and space!', icon: 'solar_system.png' },
    { id: 'programming', title: 'Coding Adventure', description: 'Learn programming with robots!', icon: null },
    { id: 'ai-game', title: 'AI Learning Lab', description: 'Discover artificial intelligence!', icon: null },
    { id: 'speed-round', title: 'Speed Round', description: '60 seconds challenge!', icon: 'speed_run.png' },
    { id: 'coop', title: 'Co-op Mode', description: 'Play together offline!', icon: 'coop.png' }
  ];

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Choose Your Adventure!</h2>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            className="menu-button"
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => speakTitle(item.title)}
            onMouseLeave={() => setLastSpoken(null)}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon ? (
              <img src={`/icons/${item.icon}`} alt={item.title} />
            ) : (
              <div style={{ background: 'linear-gradient(135deg, #ff6b6b, #feca57)', padding: '40px', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', margin: '10px 0 0 0' }}>{item.description}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MainMenu;
