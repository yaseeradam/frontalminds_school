# Kids Learning Adventure 🌟

A fun and interactive desktop app for kids to learn math and other subjects with cartoon-style animations and engaging gameplay.

## Features

- 🔢 **Math Games**: Interactive arithmetic with addition, subtraction, multiplication, and division
- 📚 **Spelling Game**: Word unscrambling and spelling challenges
- 🔬 **Science Lab**: Color mixing experiments and interactive learning
- 🧠 **Memory Match**: Card matching game to improve memory skills
- 🎯 **Advanced Scoring**: Points, streaks, and difficulty-based bonuses
- 🏆 **Achievement System**: Unlockable badges and progress tracking
- 🎨 **Customizable Themes**: Multiple color schemes to choose from
- 🔊 **Sound Effects**: Interactive audio feedback (can be toggled)
- ⏱️ **Timer Challenges**: Optional timed modes for extra difficulty
- 📊 **Progress Dashboard**: Detailed statistics and achievement tracking
- 🤖 **Animated Mascot**: Encouraging character that reacts to gameplay
- ⚙️ **Settings Panel**: Customizable difficulty, themes, and preferences
- 🖥️ **Desktop App**: Cross-platform Electron application

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add missing dependency:
```bash
npm install electron-is-dev
```

### Running the App

**Development Mode:**
```bash
npm run electron-dev
```

**Build for Production:**
```bash
npm run electron-pack
```

## Project Structure

```
kids-learning-app/
├── public/
│   ├── electron.js          # Main Electron process
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── MainMenu.js     # Main menu component
│   │   ├── Settings.js     # Settings and preferences
│   │   ├── Progress.js     # Progress tracking dashboard
│   │   └── Character.js    # Animated mascot component
│   ├── games/
│   │   ├── MathGame.js     # Enhanced math game
│   │   ├── SpellingGame.js # Word spelling challenges
│   │   ├── ScienceGame.js  # Science experiments
│   │   └── MemoryGame.js   # Memory matching game
│   ├── utils/
│   │   └── soundEffects.js # Audio feedback system
│   ├── App.js              # Main React component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
└── package.json
```

## Expanding the App

### Current Game Features
- **Math Game**: Multiple difficulty levels, timed challenges, division support
- **Spelling Game**: Word unscrambling with visual hints
- **Science Lab**: Interactive color mixing experiments
- **Memory Game**: Card matching with emoji pairs

### System Features
- **Progress Tracking**: Automatic saving of scores and achievements
- **Achievement System**: 6 different badges to unlock
- **Theme System**: 4 beautiful color themes
- **Sound System**: Web Audio API-based sound effects
- **Difficulty Scaling**: Easy, Medium, Hard modes
- **Local Storage**: Persistent progress and settings

### Adding New Games
1. Create new game component in `src/games/`
2. Add navigation logic in `App.js`
3. Update `MainMenu.js` with new menu item
4. Integrate with progress tracking system

### Future Enhancements
- Multiplayer modes
- More science experiments
- Reading comprehension games
- Parental dashboard with detailed analytics
- Cloud save synchronization
- More animated characters

## Technologies Used

- **React**: UI framework with hooks
- **Electron**: Desktop app framework
- **Framer Motion**: Smooth animations and transitions
- **Web Audio API**: Sound effects and audio feedback
- **Local Storage**: Progress and settings persistence
- **CSS3**: Advanced styling, gradients, and responsive design
- **JavaScript ES6+**: Modern JavaScript features