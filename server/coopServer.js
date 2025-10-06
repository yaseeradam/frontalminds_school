const WebSocket = require('ws');
const os = require('os');

const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT });

let rooms = {};

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

wss.on('connection', (ws) => {
  console.log('New player connected');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch (data.type) {
      case 'create_room':
        const roomId = Math.random().toString(36).substring(7);
        rooms[roomId] = { host: ws, guest: null, gameState: {} };
        ws.roomId = roomId;
        ws.isHost = true;
        ws.send(JSON.stringify({ type: 'room_created', roomId }));
        console.log(`Room created: ${roomId}`);
        break;
        
      case 'join_room':
        const room = rooms[data.roomId];
        if (room && !room.guest) {
          room.guest = ws;
          ws.roomId = data.roomId;
          ws.isHost = false;
          
          room.host.send(JSON.stringify({ type: 'player_joined' }));
          ws.send(JSON.stringify({ type: 'joined_room' }));
          console.log(`Player joined room: ${data.roomId}`);
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'Room not found or full' }));
        }
        break;
        
      case 'game_action':
        const actionRoom = rooms[ws.roomId];
        if (actionRoom) {
          const target = ws.isHost ? actionRoom.guest : actionRoom.host;
          if (target) {
            target.send(JSON.stringify({ type: 'game_action', data: data.data }));
          }
        }
        break;
        
      case 'game_state':
        const stateRoom = rooms[ws.roomId];
        if (stateRoom) {
          stateRoom.gameState = data.state;
          const target = ws.isHost ? stateRoom.guest : stateRoom.host;
          if (target) {
            target.send(JSON.stringify({ type: 'game_state', state: data.state }));
          }
        }
        break;
    }
  });
  
  ws.on('close', () => {
    if (ws.roomId && rooms[ws.roomId]) {
      const room = rooms[ws.roomId];
      if (ws.isHost) {
        if (room.guest) {
          room.guest.send(JSON.stringify({ type: 'host_disconnected' }));
        }
        delete rooms[ws.roomId];
      } else {
        room.guest = null;
        if (room.host) {
          room.host.send(JSON.stringify({ type: 'guest_disconnected' }));
        }
      }
    }
    console.log('Player disconnected');
  });
});

const localIP = getLocalIP();
console.log(`\n🎮 Co-op Server Running!`);
console.log(`📡 Local IP: ${localIP}:${PORT}`);
console.log(`\nHost: Start a game and share the room code`);
console.log(`Guest: Enter host's IP (${localIP}) and room code\n`);
