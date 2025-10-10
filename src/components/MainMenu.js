import React from 'react';
import { motion } from 'framer-motion';
import { VoiceManager } from '../utils/voiceManager';

const MainMenu = ({ onNavigate, onLogout, userLevel = 4, totalScore, userName = 'Yaseer', selectedAvatar, progress, currentProfile, score }) => {
  const [lastSpoken, setLastSpoken] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked'));
    }
  }, []);

  const speakTitle = (title) => {
    if (lastSpoken === title) return;
    window.speechSynthesis.cancel();
    VoiceManager.speak(title);
    setLastSpoken(title);
  };

  const mainModules = [
    { id: 'math', title: 'Math', icon: '➕➖✖️➗', bgColor: 'linear-gradient(145deg, #FDB022, #F59E0B)' },
    { id: 'science', title: 'Science', icon: '🧪', bgColor: 'linear-gradient(145deg, #A78BFA, #8B5CF6)' },
    { id: 'reading', title: 'Reading', icon: '🔤', bgColor: 'linear-gradient(145deg, #34D399, #10B981)' },
  ];

  const navigationButtons = [
    { id: 'learn', title: 'Learn', icon: '📚', bgColor: 'rgba(255, 255, 255, 0.5)' },
    { id: 'play', title: 'Play', icon: '🎮', bgColor: 'rgba(255, 255, 255, 0.5)' },
    { id: 'progress', title: 'My Progress', icon: '📊', bgColor: 'rgba(255, 255, 255, 0.5)' },
  ];

  return (
    <div className="frontal-dashboard">
      <video className="background-video" autoPlay muted loop>
        <source src="/video/dashboard-bg-video.mp4" type="video/mp4" />
        <source src="/video/dashboard-bg-video.webm" type="video/webm" />
      </video>
      <audio ref={audioRef} loop>
        <source src="/audio/dashboard-bg-music.mp3" type="audio/mpeg" />
        <source src="/audio/dashboard-bg-music.ogg" type="audio/ogg" />
      </audio>
      {/* Header with Branding and User Profile */}
      <div className="top-header">
        <div className="branding">
          <h1 className="brand-name">FrontalMinds</h1>
          <p className="brand-tagline">Think Smart. Learn Fun!</p>
        </div>

        {/* Navigation Bar integrated into header */}
        <div className="header-navbar">
          <motion.button
            onClick={() => onNavigate('challenges')}
            className="header-navbar-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbar-icon">🎯</span>
            <span className="navbar-label">Challenges</span>
          </motion.button>

          <motion.button
            onClick={() => onNavigate('inventory')}
            className="header-navbar-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbar-icon">🎒</span>
            <span className="navbar-label">Collection</span>
          </motion.button>
        </div>

        <div className="user-profile-header" onClick={() => setShowDropdown(!showDropdown)}>
          {selectedAvatar && selectedAvatar.startsWith('/avatars/') ? (
            <img src={selectedAvatar} alt="User Avatar" className="avatar-img-header" />
          ) : (
            <div className="avatar-img-header" style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedAvatar}</div>
          )}
          <div className="level-info-header">
            <span className="level-text-header">Level {Math.floor(progress?.totalScore / 500) + 1} Learner</span>
            <div className="progress-bar-header">
              <div
                className="progress-fill-header"
                style={{ width: `${((progress?.totalScore % 500) / 500) * 100}%` }}
              ></div>
              <div className="progress-icon-header">🔥</div>
            </div>
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <button onClick={(e) => { e.stopPropagation(); onNavigate('settings'); }}>⚙️ Settings</button>
              <button onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Logout and return to profile selection?')) {
                  onLogout();
                }
              }}>🚪 Logout</button>
            </div>
          )}
        </div>
      </div>

      <div className="main-container">
        {/* Main Content Area */}
        <div className="content-wrapper">
          <div className="left-content">
            {/* Welcome Section */}
            <div className="welcome-section">
              <div className="welcome-text">
                <h2>Hi {userName}!</h2>
                <h3>Ready to learn<br />something fun today?</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="start-button"
                  onClick={() => onNavigate('math')}
                >
                  Start Learning
                </motion.button>
              </div>

              <motion.img
                src="/avatars/Gemini_Generated_Image_f9aieuf9aieuf9ai.png"
                alt="Fox Mascot"
                className="main-mascot"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
              {navigationButtons.map((btn, index) => (
                <motion.button
                  key={btn.id}
                  className="nav-button"
                  onClick={() => btn.id === 'learn' ? onNavigate('math') : onNavigate(btn.id)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ background: btn.bgColor }}
                >
                  <span className="nav-icon">{btn.icon}</span>
                  <span className="nav-title">{btn.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Lesson Modules */}
            <div className="modules-section">
              <h2>Lesson Modules</h2>
              <div className="modules-grid">
                {mainModules.map((module, index) => (
                  <motion.button
                    key={module.id}
                    className="module-card"
                    onClick={() => onNavigate(module.id)}
                    onMouseEnter={() => speakTitle(module.title)}
                    onMouseLeave={() => setLastSpoken(null)}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ background: module.bgColor }}
                  >
                    <div className="module-icon-wrapper">
                      <div className="module-icon">{module.icon}</div>
                    </div>
                    <span className="module-title">{module.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Tip Box with Owl */}
          <div className="right-content">
            <motion.div 
              className="tip-card"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Tip</span>
              </div>
              <p className="tip-text">You can earn stars by finishing lessons!</p>
            </motion.div>

            <motion.video
              className="owl-mascot"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/penguin-video.mp4" type="video/mp4" />
              <source src="/video/penguin-video.webm" type="video/webm" />
            </motion.video>
          </div>
        </div>
      </div>

      <style jsx>{`
        .frontal-dashboard {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #A5D8FF 0%, #74C0FC 100%);
          padding: 0;
          margin: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
          position: fixed;
          top: 0;
          left: 0;
        }

        .background-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -1;
          opacity: 0.3;
        }

        .top-header {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          padding: 20px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0 0 30px 30px;
          margin: 0 auto;
          max-width: 1400px;
        }

        .branding {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .brand-tagline {
          font-size: 1.1rem;
          color: #1E293B;
          margin: 0;
          font-weight: 500;
        }

        .user-profile-header {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          cursor: pointer;
        }

        .avatar-img-header {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          object-fit: cover;
          background: white;
        }

        .level-info-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .level-text-header {
          font-size: 1rem;
          font-weight: 700;
          color: #1E3A8A;
        }

        .progress-bar-header {
          width: 150px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          overflow: visible;
          position: relative;
        }

        .progress-fill-header {
          height: 100%;
          background: linear-gradient(90deg, #FDB022, #F59E0B);
          border-radius: 20px;
          transition: width 0.4s ease;
        }

        .progress-icon-header {
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 10px;
          z-index: 1000;
          min-width: 150px;
        }

        .user-dropdown button {
          display: block;
          width: 100%;
          padding: 10px 15px;
          border: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #1E3A8A;
        }

        .user-dropdown button:hover {
          background: #f8f9fa;
        }

        .header-navbar {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
          max-width: 50%;
        }

        .header-navbar-btn {
          background: linear-gradient(145deg, #ffffff, #e2e8f0);
          backdrop-filter: blur(15px);
          border: none;
          border-radius: 25px;
          padding: 15px 25px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 
                      inset 0 2px 0 rgba(255, 255, 255, 1),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .header-navbar-btn:hover {
          background: linear-gradient(145deg, #ffffff, #f1f5f9);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25), 
                      inset 0 3px 0 rgba(255, 255, 255, 1),
                      inset 0 -3px 0 rgba(0, 0, 0, 0.15);
        }

        .header-navbar-btn:active {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.9),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
        }

        .navbar-icon {
          font-size: 1.6rem;
          background: linear-gradient(145deg, #ffffff, #e2e8f0);
          width: 45px;
          height: 45px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15), 
                      inset 0 2px 0 rgba(255, 255, 255, 1),
                      inset 0 -2px 0 rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.9);
        }

        .navbar-label {
          font-size: 1rem;
          font-weight: 700;
          color: #1E3A8A;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .main-container {
          width: 100%;
          min-height: calc(100vh - 120px);
          padding: 0;
        }

        .content-wrapper {
          display: flex;
          gap: 30px;
          width: 100%;
          padding: 40px 60px;
        }

        .left-content {
          flex: 1;
        }

        .right-content {
          width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .welcome-section {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(30px);
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 30px;
          padding: 40px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.6);
        }

        .welcome-text h2 {
          font-size: 3rem;
          color: #1E3A8A;
          font-weight: 800;
          margin: 0 0 10px 0;
          line-height: 1.1;
        }

        .welcome-text h3 {
          font-size: 1.6rem;
          color: #1E3A8A;
          margin: 0 0 30px 0;
          font-weight: 600;
          line-height: 1.3;
        }

        .start-button {
          background: linear-gradient(135deg, #FDB022, #F59E0B);
          color: #1E3A8A;
          padding: 16px 40px;
          border: none;
          border-radius: 25px;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(253, 176, 34, 0.4);
          transition: all 0.3s ease;
        }

        .start-button:hover {
          box-shadow: 0 12px 28px rgba(253, 176, 34, 0.5);
        }

        .main-mascot {
          width: 280px;
          height: 280px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        .navigation-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .nav-button {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .nav-button:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.7);
        }

        .nav-icon {
          font-size: 2rem;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1E293B;
        }

        .modules-section {
          margin-top: 20px;
        }

        .modules-section h2 {
          color: #1E3A8A;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 25px;
          text-align: left;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .module-card {
          border-radius: 30px;
          border: none;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          min-height: 200px;
        }

        .module-card:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .module-icon-wrapper {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .module-icon {
          font-size: 3rem;
          line-height: 1;
        }

        .module-title {
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tip-card {
          background: white;
          border-radius: 25px;
          padding: 25px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          width: 100%;
        }

        .tip-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .tip-icon {
          font-size: 2rem;
        }

        .tip-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1E293B;
        }

        .tip-text {
          font-size: 1rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        .owl-mascot {
          width: 240px;
          height: 240px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        @media (max-width: 1200px) {
          .content-wrapper {
            flex-direction: column;
          }

          .right-content {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }

          .owl-mascot {
            width: 180px;
            height: 180px;
          }
        }

        @media (max-width: 768px) {
          .top-header {
            padding: 15px 20px;
            flex-direction: column;
            gap: 15px;
          }

          .header-navbar {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .header-navbar-btn {
            padding: 6px 12px;
          }

          .navbar-label {
            font-size: 0.8rem;
          }

          .brand-name {
            font-size: 2rem;
          }

          .brand-tagline {
            font-size: 0.9rem;
          }

          .content-wrapper {
            padding: 30px 20px;
          }

          .welcome-section {
            flex-direction: column;
            text-align: center;
            padding: 30px;
          }

          .main-mascot {
            width: 200px;
            height: 200px;
          }

          .navigation-buttons {
            grid-template-columns: 1fr;
          }

          .modules-grid {
            grid-template-columns: 1fr;
          }

          .right-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default MainMenu;
