# 🤝 Co-op Mode Instructions

## How to Play Together Offline

Co-op mode allows two students to play together on different computers without needing internet! They just need to be on the same WiFi network.

---

## 📋 Setup Steps

### Step 1: Start the Co-op Server

One computer needs to run the server. Open a terminal/command prompt and run:

```bash
npm run coop-server
```

You'll see something like:
```
🎮 Co-op Server Running!
📡 Local IP: 192.168.1.5:3001

Host: Start a game and share the room code
Guest: Enter host's IP (192.168.1.5) and room code
```

**Important:** Write down the IP address shown (e.g., `192.168.1.5`)

---

### Step 2: Computer 1 (Host) Creates a Room

1. Open the Kids Learning Adventure app
2. Click **"🤝 Co-op Mode"** from the main menu
3. Click **"🎮 Host Game"**
4. Enter the server IP:
   - If the server is running on the same computer: use `localhost`
   - If the server is on a different computer: use the IP from Step 1 (e.g., `192.168.1.5`)
5. Click **"Create Room"**
6. You'll get a **Room Code** (e.g., `abc123`)
7. **Share this code with Player 2!**

---

### Step 3: Computer 2 (Guest) Joins the Room

1. Open the Kids Learning Adventure app
2. Click **"🤝 Co-op Mode"** from the main menu
3. Click **"🔗 Join Game"**
4. Enter the **Host IP** (the IP from Step 1, e.g., `192.168.1.5`)
5. Enter the **Room Code** that Player 1 shared
6. Click **"Join Room"**
7. Wait for connection...

---

### Step 4: Play Together!

Once both players are connected:
- Both see the same math question
- Each player submits their own answer
- **Scoring:**
  - ✅ Both correct = **+20 points**
  - ✅ One correct = **+10 points**
  - ❌ Both wrong = **0 points, try next question**
- Work together to get the highest team score!

---

## 🔧 Troubleshooting

### "Connection failed!"
- Make sure the server is running (`npm run coop-server`)
- Check that both computers are on the same WiFi network
- Verify the IP address is correct

### "Room not found"
- Make sure the room code is typed correctly (lowercase)
- The host must create the room first
- Room codes are case-sensitive

### "Host disconnected"
- If the host closes their app, the room is closed
- Create a new room and share the new code

### Can't find the IP address?
**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter

**Mac/Linux:**
```bash
ifconfig
```
Look for "inet" under your WiFi adapter

---

## 💡 Tips

1. **Same Computer Testing:** You can test co-op mode on one computer by:
   - Running the server
   - Opening two browser windows
   - One hosts with `localhost`, one joins with `localhost`

2. **Classroom Setup:** 
   - Teacher's computer runs the server
   - Students enter teacher's IP to connect
   - Multiple pairs can play simultaneously (different room codes)

3. **Home Setup:**
   - One parent/sibling computer runs the server
   - Kids connect from their devices
   - Great for collaborative learning!

4. **Network Requirements:**
   - Same WiFi network (no internet needed)
   - OR same LAN (ethernet cables to same router)
   - Firewall may need to allow port 3001

---

## 🎮 Available Co-op Games

Currently available:
- **Co-op Math** - Work together to solve math problems

Coming soon:
- Co-op Spelling
- Co-op Memory Match
- Co-op Science Lab

---

## 🔒 Privacy & Safety

- ✅ All data stays on local network
- ✅ No internet connection required
- ✅ No data sent to external servers
- ✅ Room codes expire when host disconnects
- ✅ Perfect for classroom or home use

---

## 📞 Need Help?

If you're having trouble:
1. Make sure both computers are on the same WiFi
2. Restart the server
3. Check firewall settings (allow port 3001)
4. Try using IP address instead of `localhost`

---

**Happy Learning Together! 🎉**
