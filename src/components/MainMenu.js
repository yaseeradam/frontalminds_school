import React from 'react';
import { motion } from 'framer-motion';
import { VoiceManager } from '../utils/voiceManager';

const MainMenu = ({ onNavigate, userLevel = 4, totalScore, userName = 'Yaseer' }) => {
  const [lastSpoken, setLastSpoken] = React.useState(null);

  const speakTitle = (title) => {
    if (lastSpoken === title) return;
    window.speechSynthesis.cancel();
    VoiceManager.speak(title);
    setLastSpoken(title);
  };

  const mainModules = [
    { id: 'math', title: 'Math', icon: '➕➖✖️➗', color: '#FDB022', bgColor: 'linear-gradient(145deg, #FDB022, #F59E0B)' },
    { id: 'science', title: 'Science', icon: '🧪', color: '#A78BFA', bgColor: 'linear-gradient(145deg, #A78BFA, #8B5CF6)' },
    { id: 'reading', title: 'Reading', icon: '🔤', color: '#34D399', bgColor: 'linear-gradient(145deg, #34D399, #10B981)' },
  ];

  const navigationButtons = [
    { id: 'learn', title: 'Learn', icon: '📚', color: '#93C5FD', bgColor: 'rgba(147, 197, 253, 0.3)' },
    { id: 'play', title: 'Play', icon: '🎮', color: '#93C5FD', bgColor: 'rgba(147, 197, 253, 0.3)' },
    { id: 'progress', title: 'My Progress', icon: '📊', color: '#6EE7B7', bgColor: 'rgba(110, 231, 183, 0.3)' },
  ];

  return (
    <div className="frontal-dashboard">
      <div className="main-container">
        {/* Header Section */}
        <div className="header-section">
          <div className="branding">
            <h1>FrontalMinds</h1>
            <p>Think Smart. Learn Fun!</p>
          </div>

          <div className="user-profile">
            <img src="/avatars/Gemini_Generated_Image_f9aieuf9aieuf9ai.png" alt="User Avatar" className="avatar-img" />
            <div className="level-info">
              <span className="level-text">Level {userLevel} Learner</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
                <div className="progress-icon">🔥</div>
              </div>
            </div>
          </div>
        </div>

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

            <motion.img
              src="/avatars/Gemini_Generated_Image_obuqizobuqizobuq.png"
              alt="Owl Mascot"
              className="owl-mascot"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .frontal-dashboard {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(180deg, #BAE6FD 0%, #7DD3FC 50%, #BAE6FD 100%);
          padding: 0;
          margin: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .main-container {
          width: 100%;
          min-height: 100vh;
          background: transparent;
          overflow: hidden;
          padding-bottom: 40px;
        }

        /* Header Section */
        .header-section {
          background: rgba(255, 255, 255, 0.95);
          padding: 25px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .branding h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          color: #1E293B;
          letter-spacing: -0.5px;
        }

        .branding p {
          font-size: 1.1rem;
          color: #475569;
          margin: 5px 0 0 0;
          font-weight: 500;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .avatar-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          object-fit: cover;
        }

        .level-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .level-text {
          font-size: 1rem;
          font-weight: 600;
          color: #1E293B;
        }

        .progress-bar {
          width: 180px;
          height: 14px;
          background: rgba(148, 163, 184, 0.3);
          border-radius: 20px;
          overflow: visible;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FDB022, #F59E0B);
          border-radius: 20px;
          transition: width 0.4s ease;
        }

        .progress-icon {
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.3rem;
        }

        /* Content Wrapper */
        .content-wrapper {
          display: flex;
          gap: 30px;
          padding: 40px 60px;
          max-width: 1600px;
          margin: 0 auto;
        }

        .left-content {
          flex: 1;
        }

        .right-content {
          width: 280px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        /* Welcome Section */
        .welcome-section {
          background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);
          border-radius: 30px;
          padding: 40px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .welcome-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
        }

        .welcome-text {
          position: relative;
          z-index: 1;
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
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        /* Navigation Buttons */
        .navigation-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .nav-button {
          background: rgba(147, 197, 253, 0.3);
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

        /* Modules Section */
        .modules-section {
          margin-top: 20px;
        }

        .modules-section h2 {
          color: #1E293B;
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

        /* Tip Card */
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

        /* Responsive Design */
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
          .header-section {
            flex-direction: column;
            gap: 20px;
            text-align: center;
            padding: 20px 30px;
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
