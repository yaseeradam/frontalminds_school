import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const SolarSystemGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const planets = [
    { name: 'Mercury', color: '#8C7853', size: 30, distance: 80, fact: 'Closest to the Sun!', emoji: '☿️' },
    { name: 'Venus', color: '#FFC649', size: 45, distance: 130, fact: 'Hottest planet!', emoji: '♀️' },
    { name: 'Earth', color: '#4A90E2', size: 48, distance: 180, fact: 'Our home planet!', emoji: '🌍' },
    { name: 'Mars', color: '#E27B58', size: 35, distance: 230, fact: 'The Red Planet!', emoji: '♂️' },
    { name: 'Jupiter', color: '#C88B3A', size: 90, distance: 300, fact: 'Largest planet!', emoji: '♃' },
    { name: 'Saturn', color: '#FAD5A5', size: 80, distance: 380, fact: 'Has beautiful rings!', emoji: '♄' },
    { name: 'Uranus', color: '#4FD0E7', size: 60, distance: 450, fact: 'Tilted on its side!', emoji: '♅' },
    { name: 'Neptune', color: '#4166F5', size: 58, distance: 510, fact: 'Farthest from Sun!', emoji: '♆' }
  ];

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const generateQuiz = () => {
    const correctPlanet = planets[Math.floor(Math.random() * planets.length)];
    const wrongPlanets = planets.filter(p => p.name !== correctPlanet.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctPlanet, ...wrongPlanets].sort(() => Math.random() - 0.5);
    
    setQuestion(correctPlanet);
    setOptions(allOptions);
    setFeedback('');
  };

  const handleQuizAnswer = (planet) => {
    if (planet.name === question.name) {
      setFeedback('🎉 Correct!');
      setScore(prev => prev + 10);
      onScore(10);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => generateQuiz(), 2000);
    } else {
      setFeedback(`❌ Wrong! It's ${question.name}`);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  const speakPlanet = (planetName) => {
    if (!settings.voiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(planetName);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🪐 Solar System Explorer!</h2>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
        <button
          onClick={() => { setQuizMode(false); setSelectedPlanet(null); }}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: !quizMode ? '3px solid #667eea' : '2px solid #ccc',
            background: !quizMode ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
            color: !quizMode ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔭 Explore
        </button>
        <button
          onClick={() => { setQuizMode(true); generateQuiz(); }}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: quizMode ? '3px solid #667eea' : '2px solid #ccc',
            background: quizMode ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
            color: quizMode ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎯 Quiz
        </button>
      </div>

      {quizMode ? (
        <div style={{ marginTop: '30px' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Score: {score} 🌟</p>
          
          {question && (
            <>
              <div style={{ fontSize: '1.8rem', margin: '30px 0', fontWeight: 'bold', color: '#667eea' }}>
                Which planet is {question.fact.toLowerCase()}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
                {options.map((planet, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleQuizAnswer(planet)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '20px',
                      borderRadius: '15px',
                      border: '3px solid ' + planet.color,
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: planet.color
                    }}
                  >
                    {planet.emoji} {planet.name}
                  </motion.button>
                ))}
              </div>

              {feedback && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{
                    fontSize: '2rem',
                    marginTop: '30px',
                    padding: '15px',
                    borderRadius: '10px',
                    background: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
                    color: feedback.includes('Correct') ? '#155724' : '#721c24',
                    fontWeight: 'bold'
                  }}
                >
                  {feedback}
                </motion.div>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div style={{ position: 'relative', height: '600px', margin: '30px auto', maxWidth: '1100px', background: 'radial-gradient(circle, #1a1a2e 0%, #0f0f1e 100%)', borderRadius: '20px', overflow: 'hidden' }}>
            {/* Sun */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FDB813 0%, #FF6B35 100%)',
                boxShadow: '0 0 40px #FDB813',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPlanet({ name: 'Sun', fact: 'The star at the center of our solar system!', emoji: '☀️' })}
            />

            {/* Planets */}
            {planets.map((planet, idx) => (
              <motion.div
                key={planet.name}
                animate={{ rotate: 360 }}
                transition={{ duration: 10 + idx * 5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: planet.distance * 2,
                  height: planet.distance * 2,
                  marginLeft: -planet.distance,
                  marginTop: -planet.distance,
                  border: '1px dashed rgba(255,255,255,0.2)',
                  borderRadius: '50%'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  onClick={() => { setSelectedPlanet(planet); speakPlanet(planet.name); }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: planet.size,
                    height: planet.size,
                    borderRadius: '50%',
                    background: planet.color,
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${planet.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: planet.size * 0.5 + 'px'
                  }}
                >
                  {planet.emoji}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {selectedPlanet && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                marginTop: '20px',
                padding: '30px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.95))',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                maxWidth: '500px',
                margin: '20px auto'
              }}
            >
              <h3 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#667eea' }}>
                {selectedPlanet.emoji} {selectedPlanet.name}
              </h3>
              <p style={{ fontSize: '1.5rem', color: '#666' }}>{selectedPlanet.fact}</p>
              <button
                onClick={() => setSelectedPlanet(null)}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Close
              </button>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SolarSystemGame;
