import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const ClockGame = ({ onNavigate, onScore, onProgress, settings }) => {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    setHour(Math.floor(Math.random() * 12) + 1);
    setMinute([0, 15, 30, 45][Math.floor(Math.random() * 4)]);
    setUserAnswer('');
    setFeedback('');
  };

  const speakTime = () => {
    if (!settings.voiceEnabled) return;
    const text = minute === 0 ? `${hour} o'clock` : `${hour} ${minute}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = () => {
    const correctAnswer = `${hour}:${minute.toString().padStart(2, '0')}`;
    if (userAnswer === correctAnswer) {
      setFeedback('🎉 Correct time!');
      setStreak(prev => prev + 1);
      onScore(15 + streak * 3);
      onProgress('mathProblems');
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => { setFeedback(''); generateQuestion(); }, 2000);
    } else {
      setFeedback(`Try again! The time is ${correctAnswer}`);
      setStreak(0);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🕐 Clock Reading!</h2>
      <p>Streak: {streak} 🔥</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>What time is it?</p>
        {settings.voiceEnabled && (
          <button onClick={speakTime} style={{ fontSize: '2rem', padding: '10px 15px', borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', cursor: 'pointer', width: '60px', height: '60px' }} title="Read time aloud">
            🔊
          </button>
        )}
      </div>

      <div style={{ position: 'relative', width: '300px', height: '300px', margin: '30px auto', borderRadius: '50%', border: '8px solid #333', background: '#fff' }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '2px',
            height: '140px',
            background: '#333',
            transformOrigin: 'top center',
            transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
            marginTop: '10px'
          }}>
            <div style={{ position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {i === 0 ? 12 : i}
            </div>
          </div>
        ))}
        
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '8px', height: '8px', borderRadius: '50%', background: '#333', transform: 'translate(-50%, -50%)', zIndex: 10 }} />
        
        <motion.div
          animate={{ rotate: hourAngle }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '6px',
            height: '80px',
            background: '#333',
            transformOrigin: 'top center',
            transform: 'translate(-50%, 0)',
            marginTop: '70px',
            borderRadius: '3px'
          }}
        />
        
        <motion.div
          animate={{ rotate: minuteAngle }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '110px',
            background: '#ff6b6b',
            transformOrigin: 'top center',
            transform: 'translate(-50%, 0)',
            marginTop: '40px',
            borderRadius: '2px'
          }}
        />
      </div>

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        style={{ fontSize: '2rem', padding: '15px', borderRadius: '10px', border: '3px solid #ddd', textAlign: 'center', width: '200px', margin: '20px 0' }}
        placeholder="e.g. 3:30"
      />

      <motion.button onClick={handleSubmit} disabled={!userAnswer} whileHover={userAnswer ? { scale: 1.05 } : {}} whileTap={userAnswer ? { scale: 0.95 } : {}}
        style={{ fontSize: '1.5rem', padding: '15px 30px', borderRadius: '15px', border: 'none', background: 'linear-gradient(135deg, #ff6b6b, #feca57)', color: 'white', cursor: userAnswer ? 'pointer' : 'not-allowed', opacity: userAnswer ? 1 : 0.5, fontWeight: 'bold' }}>
        Check Answer! ✨
      </motion.button>

      {feedback && <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>{feedback}</motion.div>}
    </motion.div>
  );
};

export default ClockGame;