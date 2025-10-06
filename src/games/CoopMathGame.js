import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';

const CoopMathGame = ({ onNavigate, onScore, onProgress, settings, ws, isHost, playerAvatar, playerName }) => {
  const [question, setQuestion] = useState({});
  const [myAnswer, setMyAnswer] = useState('');
  const [partnerAnswer, setPartnerAnswer] = useState('');
  const [partnerAvatar, setPartnerAvatar] = useState('👤');
  const [partnerName, setPartnerName] = useState('Partner');
  const [feedback, setFeedback] = useState('');
  const [teamScore, setTeamScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    if (isHost) {
      generateQuestion();
    }

    ws.send(JSON.stringify({
      type: 'player_info',
      data: { avatar: playerAvatar, name: playerName }
    }));

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'game_state') {
        setQuestion(data.state.question);
        setPartnerAnswer(data.state.answer);
        
        if (data.state.checkAnswers) {
          checkBothAnswers(myAnswer, data.state.answer);
        }
      }
      
      if (data.type === 'game_action') {
        if (data.data.action === 'answer_submitted') {
          setPartnerAnswer(data.data.answer);
        }
      }

      if (data.type === 'player_info') {
        setPartnerAvatar(data.data.avatar || '👤');
        setPartnerName(data.data.name || 'Partner');
      }
    };
  }, [ws, isHost, myAnswer, playerAvatar, playerName]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let answer;
    if (op === '+') answer = num1 + num2;
    else if (op === '-') answer = Math.abs(num1 - num2);
    else answer = num1 * num2;
    
    const newQuestion = { num1, num2, op, answer };
    setQuestion(newQuestion);
    setMyAnswer('');
    setPartnerAnswer('');
    setFeedback('');
    
    ws.send(JSON.stringify({
      type: 'game_state',
      state: { question: newQuestion, answer: '' }
    }));
  };

  const handleSubmit = () => {
    ws.send(JSON.stringify({
      type: 'game_action',
      data: { action: 'answer_submitted', answer: myAnswer }
    }));
    
    if (isHost) {
      ws.send(JSON.stringify({
        type: 'game_state',
        state: { question, answer: myAnswer, checkAnswers: true }
      }));
    }
  };

  const checkBothAnswers = (answer1, answer2) => {
    const correct1 = parseInt(answer1) === question.answer;
    const correct2 = parseInt(answer2) === question.answer;
    
    if (correct1 && correct2) {
      setFeedback('🎉 Both correct! +20 points!');
      setTeamScore(prev => prev + 20);
      setQuestionsAnswered(prev => prev + 1);
      onScore(20);
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => {
        if (isHost) generateQuestion();
      }, 2000);
    } else if (correct1 || correct2) {
      setFeedback('😊 One correct! +10 points!');
      setTeamScore(prev => prev + 10);
      setQuestionsAnswered(prev => prev + 1);
      onScore(10);
      if (settings.soundEnabled) soundEffects.playSuccess();
      setTimeout(() => {
        if (isHost) generateQuestion();
      }, 2000);
    } else {
      setFeedback(`❌ Both wrong! Answer: ${question.answer}`);
      if (settings.soundEnabled) soundEffects.playError();
      setTimeout(() => {
        if (isHost) generateQuestion();
      }, 2000);
    }
  };

  return (
    <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
      
      <h2>🤝 Co-op Math!</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <div style={{ color: '#28a745' }}>Team Score: {teamScore}</div>
        <div style={{ color: '#667eea' }}>Questions: {questionsAnswered}</div>
      </div>

      <motion.div
        key={`${question.num1}-${question.op}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: '4rem', margin: '40px 0', fontWeight: 'bold', color: '#667eea' }}
      >
        {question.num1} {question.op} {question.num2} = ?
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '15px', border: '3px solid #2196f3' }}>
          <h3 style={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            {playerAvatar && playerAvatar.startsWith('/avatars/') ? (
              <img src={playerAvatar} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '2rem' }}>{playerAvatar}</span>
            )}
            {playerName || 'You'}
          </h3>
          <input
            type="number"
            value={myAnswer}
            onChange={(e) => setMyAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            style={{
              fontSize: '2rem',
              padding: '15px',
              borderRadius: '10px',
              border: '3px solid #2196f3',
              textAlign: 'center',
              width: '100%',
              marginTop: '10px'
            }}
            placeholder="?"
          />
          <button
            onClick={handleSubmit}
            disabled={!myAnswer}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              background: myAnswer ? '#2196f3' : '#ccc',
              color: 'white',
              cursor: myAnswer ? 'pointer' : 'not-allowed',
              width: '100%',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Submit
          </button>
        </div>

        <div style={{ padding: '20px', background: '#fff3e0', borderRadius: '15px', border: '3px solid #ff9800' }}>
          <h3 style={{ color: '#f57c00', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
            {partnerAvatar && partnerAvatar.startsWith('/avatars/') ? (
              <img src={partnerAvatar} alt="avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '2rem' }}>{partnerAvatar}</span>
            )}
            {partnerName}
          </h3>
          <div style={{
            fontSize: '2rem',
            padding: '15px',
            borderRadius: '10px',
            border: '3px solid #ff9800',
            textAlign: 'center',
            background: 'white',
            marginTop: '10px',
            minHeight: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {partnerAnswer || '...'}
          </div>
          <div style={{ marginTop: '10px', textAlign: 'center', color: '#f57c00', fontSize: '0.9rem' }}>
            {partnerAnswer ? '✓ Answered' : 'Waiting...'}
          </div>
        </div>
      </div>

      {feedback && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            fontSize: '2rem',
            margin: '30px 0',
            padding: '20px',
            borderRadius: '15px',
            background: feedback.includes('Both correct') ? '#d4edda' : feedback.includes('One correct') ? '#fff3cd' : '#f8d7da',
            color: feedback.includes('Both correct') ? '#155724' : feedback.includes('One correct') ? '#856404' : '#721c24',
            fontWeight: 'bold'
          }}
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CoopMathGame;