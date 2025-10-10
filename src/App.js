import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainMenu from './components/MainMenu';
import MathGame from './games/MathGame';
import VisualAdditionGame from './games/VisualAdditionGame';
import VisualSubtractionGame from './games/VisualSubtractionGame';
import QuizGame from './games/QuizGame';
import SpellingGame from './games/SpellingGame';
import ScienceGame from './games/ScienceGame';
import MemoryGame from './games/MemoryGame';
import TypingGame from './games/TypingGame';
import ShapeGame from './games/ShapeGame';
import CountingGame from './games/CountingGame';
import MultiplicationGame from './games/MultiplicationGame';
import FractionGame from './games/FractionGame';
import ClockGame from './games/ClockGame';
import MoneyGame from './games/MoneyGame';
import ComparisonGame from './games/ComparisonGame';
import SolarSystemGame from './games/SolarSystemGame';
import ProgrammingGame from './games/ProgrammingGame';
import AIGame from './games/AIGame';
import Settings from './components/Settings';
import AnimatedBackground from './components/AnimatedBackground';
import SpeedRound from './components/SpeedRound';
import MultipleProfiles from './components/MultipleProfiles';
import PrintCertificate from './components/PrintCertificate';
import CoopLobby from './components/CoopLobby';
import CoopMathGame from './games/CoopMathGame';
import AccountCreation from './components/AccountCreation';
import { loadCustomAvatars, defaultAvatars } from './utils/avatarLoader';
import LevelSystem from './components/LevelSystem';
import ParticleEffect from './components/ParticleEffect';
import DarkMode from './components/DarkMode';
import Progress from './components/Progress';
import Character from './components/Character';
import Confetti from './components/Confetti';
import AvatarSelector from './components/AvatarSelector';
import AvatarInventory from './components/AvatarInventory';
import DailyChallenges from './components/DailyChallenges';
import ParentDashboard from './components/ParentDashboard';
import soundEffects from './utils/soundEffects';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [score, setScore] = useState(0);
  const [characterMood, setCharacterMood] = useState('happy');
  const [characterMessage, setCharacterMessage] = useState('');
  const [showCharacter, setShowCharacter] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('😊');
  const [showParticles, setShowParticles] = useState(false);
  const [combo, setCombo] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState({});
  const [coopWs, setCoopWs] = useState(null);
  const [isCoopHost, setIsCoopHost] = useState(false);
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const [customAvatars, setCustomAvatars] = useState([]);
  
  const [settings, setSettings] = useState({
    theme: 'default',
    soundEnabled: true,
    timerEnabled: false,
    difficulty: 'medium',
    timeLimit: 30,
    difficultyLocked: false,
    darkMode: false,
    backgroundAnimation: 'stars',
    voiceEnabled: true
  });
  
  const [progress, setProgress] = useState({
    totalScore: 0,
    mathProblems: 0,
    wordsSpelled: 0,
    experiments: 0,
    memoryGames: 0,
    wordsTyped: 0,
    shapesIdentified: 0,
    objectsCounted: 0,
    achievements: [],
    bestMathStreak: 0,
    bestSpellingStreak: 0,
    fastestMemory: 999
  });

  useEffect(() => {
    // Load saved data
    const savedProgress = localStorage.getItem('kidsLearningProgress');
    const savedSettings = localStorage.getItem('kidsLearningSettings');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Save progress
    localStorage.setItem('kidsLearningProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    // Save settings and apply theme
    localStorage.setItem('kidsLearningSettings', JSON.stringify(settings));
    soundEffects.setEnabled(settings.soundEnabled);
    applyTheme(settings.theme);
  }, [settings]);

  useEffect(() => {
    // Apply theme when screen changes
    applyTheme(settings.theme);
  }, [currentScreen]);

  const applyTheme = (theme) => {
    // Don't apply body background when on menu screen (MainMenu handles its own background)
    if (currentScreen === 'menu') {
      document.body.style.background = 'transparent';
      return;
    }
    
    const themes = {
      default: ['#667eea', '#764ba2'],
      sunset: ['#ff6b6b', '#feca57'],
      forest: ['#06ffa5', '#00d4aa'],
      purple: ['#a8edea', '#fed6e3']
    };
    
    const colors = themes[theme] || themes.default;
    document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    if (settings.soundEnabled) {
      soundEffects.playClick();
    }
  };

  const handleLogout = () => {
    setCurrentProfile(null);
    localStorage.removeItem('currentProfile');
    localStorage.removeItem('selectedAvatar');
    setSelectedAvatar('😊');
    setCurrentScreen('menu');
  };

  const updateScore = (points) => {
    setScore(prev => prev + points);
    setProgress(prev => ({
      ...prev,
      totalScore: prev.totalScore + points
    }));
    
    if (points > 0) {
      setCharacterMood('celebrating');
      setCharacterMessage('Amazing work!');
      setShowParticles(true);
      setCombo(prev => prev + 1);
      
      if (combo > 5) {
        setCharacterMessage(`${combo}x COMBO! 🔥`);
      }
      
      if (settings.soundEnabled) {
        soundEffects.playSuccess();
      }
      
      setTimeout(() => setShowParticles(false), 100);
    } else {
      setCombo(0);
    }
  };

  const updateProgress = (type, value) => {
    setProgress(prev => {
      const newProgress = { ...prev, [type]: prev[type] + (value || 1) };
      
      // Check for achievements
      const newAchievements = [...prev.achievements];
      
      if (newProgress.totalScore >= 100 && !newAchievements.includes('first_correct')) {
        newAchievements.push('first_correct');
      }
      if (newProgress.mathProblems >= 50 && !newAchievements.includes('math_master')) {
        newAchievements.push('math_master');
      }
      if (newProgress.wordsSpelled >= 25 && !newAchievements.includes('word_wizard')) {
        newAchievements.push('word_wizard');
      }
      if (newProgress.experiments >= 10 && !newAchievements.includes('scientist')) {
        newAchievements.push('scientist');
      }
      if (newProgress.memoryGames >= 10 && !newAchievements.includes('memory_champion')) {
        newAchievements.push('memory_champion');
      }
      if (newProgress.wordsTyped >= 30 && !newAchievements.includes('typing_master')) {
        newAchievements.push('typing_master');
      }
      if (newProgress.shapesIdentified >= 20 && !newAchievements.includes('shape_expert')) {
        newAchievements.push('shape_expert');
      }
      if (newProgress.objectsCounted >= 25 && !newAchievements.includes('counting_star')) {
        newAchievements.push('counting_star');
      }
      
      if (newAchievements.length > prev.achievements.length) {
        setCharacterMood('excited');
        setCharacterMessage('New achievement unlocked!');
        setShowConfetti(true);
        if (settings.soundEnabled) {
          soundEffects.playAchievement();
        }
      }
      
      return { ...newProgress, achievements: newAchievements };
    });
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('selectedAvatar', avatar);
  };

  const handleChallengeComplete = (reward) => {
    updateScore(reward);
    setShowConfetti(true);
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) setSelectedAvatar(savedAvatar);
    
    const savedProfile = localStorage.getItem('currentProfile');
    if (savedProfile) {
      setCurrentProfile(JSON.parse(savedProfile));
    } else {
      // No profile exists, show account creation
      setShowAccountCreation(true);
    }
    
    // Load custom avatars
    const avatars = loadCustomAvatars();
    if (avatars) {
      setCustomAvatars(avatars);
    }
  }, []);

  const handleCreateAccount = (accountData) => {
    setCurrentProfile(accountData);
    setSelectedAvatar(accountData.avatar);
    localStorage.setItem('currentProfile', JSON.stringify(accountData));
    localStorage.setItem('selectedAvatar', accountData.avatar);
    setShowAccountCreation(false);
  };

  const handleProfileSelect = (profile) => {
    setCurrentProfile(profile);
    localStorage.setItem('currentProfile', JSON.stringify(profile));
    setCurrentScreen('menu');
  };

  const showAchievementCertificate = (achievement) => {
    setCertificateData({
      name: currentProfile?.name || 'Student',
      achievement: achievement,
      date: new Date().toLocaleDateString()
    });
    setShowCertificate(true);
  };

  const handleStartCoopGame = (ws, isHost) => {
    setCoopWs(ws);
    setIsCoopHost(isHost);
    setCurrentScreen('coop-math');
  };

  if (showAccountCreation) {
    return (
      <AccountCreation 
        onCreateAccount={handleCreateAccount}
        existingAvatars={customAvatars.length > 0 ? customAvatars : defaultAvatars}
      />
    );
  }

  if (!currentProfile) {
    return <MultipleProfiles onSelectProfile={handleProfileSelect} />;
  }

  return (
    <div className="app">


      <main className="main-content">
        {currentScreen === 'menu' && (
          <MainMenu
            onNavigate={navigateTo}
            onLogout={handleLogout}
            selectedAvatar={selectedAvatar}
            progress={progress}
            currentProfile={currentProfile}
            score={score}
            userName={currentProfile?.name || 'Student'}
          />
        )}
        {currentScreen === 'visual-addition' && (
          <VisualAdditionGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'visual-subtraction' && (
          <VisualSubtractionGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'quiz-game' && (
          <QuizGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'math' && (
          <MathGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'spelling' && (
          <SpellingGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}

        {currentScreen === 'memory' && (
          <MemoryGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'typing' && (
          <TypingGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'shapes' && (
          <ShapeGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'counting' && (
          <CountingGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}

        {currentScreen === 'fractions' && (
          <FractionGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'clock' && (
          <ClockGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'money' && (
          <MoneyGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'comparison' && (
          <ComparisonGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'solar-system' && (
          <SolarSystemGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'programming' && (
          <ProgrammingGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'ai-game' && (
          <AIGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'speed-round' && (
          <SpeedRound
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
          />
        )}
        {currentScreen === 'coop' && (
          <CoopLobby
            onNavigate={navigateTo}
            onStartGame={handleStartCoopGame}
            playerAvatar={selectedAvatar}
            playerName={currentProfile?.name}
          />
        )}
        {currentScreen === 'coop-math' && coopWs && (
          <CoopMathGame
            onNavigate={navigateTo}
            onScore={updateScore}
            onProgress={updateProgress}
            settings={settings}
            ws={coopWs}
            isHost={isCoopHost}
            playerAvatar={selectedAvatar}
            playerName={currentProfile?.name}
          />
        )}
        {currentScreen === 'avatar' && (
          <AvatarSelector
            onNavigate={navigateTo}
            selectedAvatar={selectedAvatar}
            onSelectAvatar={handleAvatarSelect}
          />
        )}
        {currentScreen === 'inventory' && (
          <AvatarInventory
            onNavigate={navigateTo}
            currentAvatar={selectedAvatar}
            onSelectAvatar={handleAvatarSelect}
            userLevel={Math.floor(progress.totalScore / 500) + 1}
          />
        )}
        {currentScreen === 'challenges' && (
          <DailyChallenges
            onNavigate={navigateTo}
            progress={progress}
            onComplete={handleChallengeComplete}
          />
        )}
        {currentScreen === 'parent' && (
          <ParentDashboard
 unde           onNavigate={navigateTo}
            progress={progress}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
        {currentScreen === 'settings' && (
           <Settings 
            onNavigate={navigateTo}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
        {currentScreen === 'progress' && (
          <Progress 
            onNavigate={navigateTo}
            progress={progress}
          />
        )}
      </main>

      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />
      <ParticleEffect trigger={showParticles} type="stars" />
      <DarkMode enabled={settings.darkMode} />
      <AnimatedBackground type={settings.backgroundAnimation} />
      
      {showCertificate && (
        <PrintCertificate
          {...certificateData}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

export default App;
