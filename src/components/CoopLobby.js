import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CoopLobby = ({ onNavigate, onStartGame }) => {
  const [mode, setMode] = useState('menu'); // menu, host, join
  const [serverIP, setServerIP] = useState('localhost');
  const [roomCode, setRoomCode] = useState('');
  const [status, setStatus] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectToServer = (ip) => {
    try {
      const ws = new WebSocket(`ws://${ip}:3001`);
      
      ws.onopen = () => {
        setStatus('Connected to server!');
        setIsConnected(true);
        wsRef.current = ws;
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'room_created':
            setRoomCode(data.roomId);
            setStatus(`Room created! Code: ${data.roomId}`);
            break;
            
          case 'player_joined':
            setStatus('Player 2 joined! Starting game...');
            setTimeout(() => onStartGame(wsRef.current, true), 2000);
            break;
            
          case 'joined_room':
            setStatus('Joined room! Starting game...');
            setTimeout(() => onStartGame(wsRef.current, false), 2000);
            break;
            
          case 'error':
            setStatus(`Error: ${data.message}`);
            break;
            
          case 'host_disconnected':
            setStatus('Host disconnected!');
            setIsConnected(false);
            break;
            
          case 'guest_disconnected':
            setStatus('Guest disconnected!');
            break;
        }
      };
      
      ws.onerror = () => {
        setStatus('Connection failed! Make sure server is running.');
        setIsConnected(false);
      };
      
      ws.onclose = () => {
        setStatus('Disconnected from server');
        setIsConnected(false);
      };
      
    } catch (error) {
      setStatus('Failed to connect to server');
    }
  };

  const handleHost = () => {
    connectToServer(serverIP);
    setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'create_room' }));
      }
    }, 500);
  };

  const handleJoin = () => {
    connectToServer(serverIP);
    setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'join_room', roomId: roomCode }));
      }
    }, 500);
  };

  if (mode === 'menu') {
    return (
      <motion.div className="game-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <button className="back-button" onClick={() => onNavigate('menu')}>← Back</button>
        
        <h2>🤝 Co-op Mode</h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#666' }}>Play together on different computers!</p>

        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '15px', margin: '30px 0', border: '2px solid #ffc107' }}>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>📋 Setup Instructions:</h3>
          <ol style={{ textAlign: 'left', color: '#856404', lineHeight: '1.8' }}>
            <li>One computer runs: <code>npm run coop-server</code></li>
            <li>Host creates a room and shares the code</li>
            <li>Guest enters host's IP and room code</li>
            <li>Both players work together!</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
          <motion.button
            onClick={() => setMode('host')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: '1.5rem',
              padding: '30px 50px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}
          >
            🎮 Host Game
          </motion.button>

          <motion.button
            onClick={() => setMode('join')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: '1.5rem',
              padding: '30px 50px',
              borderRadius: '20px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}
          >
            🔗 Join Game
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (mode === 'host') {
    return (
      <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <button className="back-button" onClick={() => setMode('menu')}>← Back</button>
        
        <h2>🎮 Host Game</h2>

        <div style={{ margin: '30px 0' }}>
          <label style={{ fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Server IP:</label>
          <input
            type="text"
            value={serverIP}
            onChange={(e) => setServerIP(e.target.value)}
            placeholder="localhost or 192.168.x.x"
            style={{
              fontSize: '1.2rem',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid #ddd',
              width: '300px',
              textAlign: 'center'
            }}
          />
        </div>

        <motion.button
          onClick={handleHost}
          disabled={isConnected}
          whileHover={!isConnected ? { scale: 1.05 } : {}}
          whileTap={!isConnected ? { scale: 0.95 } : {}}
          style={{
            fontSize: '1.5rem',
            padding: '20px 40px',
            borderRadius: '15px',
            border: 'none',
            background: isConnected ? '#6c757d' : 'linear-gradient(135deg, #28a745, #20c997)',
            color: 'white',
            cursor: isConnected ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
        >
          {isConnected ? 'Waiting for Player 2...' : 'Create Room'}
        </motion.button>

        {roomCode && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              marginTop: '30px',
              padding: '30px',
              background: '#d4edda',
              borderRadius: '15px',
              border: '3px solid #28a745'
            }}
          >
            <h3 style={{ color: '#155724', marginBottom: '10px' }}>Room Code:</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#28a745', letterSpacing: '5px' }}>
              {roomCode}
            </div>
            <p style={{ color: '#155724', marginTop: '10px' }}>Share this code with Player 2!</p>
          </motion.div>
        )}

        {status && (
          <div style={{ marginTop: '20px', fontSize: '1.2rem', color: '#667eea', fontWeight: 'bold' }}>
            {status}
          </div>
        )}
      </motion.div>
    );
  }

  if (mode === 'join') {
    return (
      <motion.div className="game-container" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <button className="back-button" onClick={() => setMode('menu')}>← Back</button>
        
        <h2>🔗 Join Game</h2>

        <div style={{ margin: '30px 0' }}>
          <label style={{ fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Host IP:</label>
          <input
            type="text"
            value={serverIP}
            onChange={(e) => setServerIP(e.target.value)}
            placeholder="192.168.x.x"
            style={{
              fontSize: '1.2rem',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid #ddd',
              width: '300px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          />

          <label style={{ fontSize: '1.2rem', display: 'block', marginBottom: '10px' }}>Room Code:</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toLowerCase())}
            placeholder="Enter room code"
            style={{
              fontSize: '1.5rem',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid #ddd',
              width: '300px',
              textAlign: 'center',
              letterSpacing: '3px'
            }}
          />
        </div>

        <motion.button
          onClick={handleJoin}
          disabled={!roomCode || isConnected}
          whileHover={roomCode && !isConnected ? { scale: 1.05 } : {}}
          whileTap={roomCode && !isConnected ? { scale: 0.95 } : {}}
          style={{
            fontSize: '1.5rem',
            padding: '20px 40px',
            borderRadius: '15px',
            border: 'none',
            background: (!roomCode || isConnected) ? '#6c757d' : 'linear-gradient(135deg, #ff6b6b, #feca57)',
            color: 'white',
            cursor: (!roomCode || isConnected) ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
        >
          Join Room
        </motion.button>

        {status && (
          <div style={{ marginTop: '20px', fontSize: '1.2rem', color: status.includes('Error') ? '#dc3545' : '#667eea', fontWeight: 'bold' }}>
            {status}
          </div>
        )}
      </motion.div>
    );
  }
};

export default CoopLobby;