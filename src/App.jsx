import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MediaPlayer from './components/MediaPlayer';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  // Check localStorage, then fallback to OS preference
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [activeUrl, setActiveUrl] = useState(null);

  // Sync theme changes to document attributes & localStorage
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  // React to system OS theme changes if the user hasn't pinned a theme yet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const hasUserPref = localStorage.getItem('theme');
      if (!hasUserPref) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handlePlayStream = (url) => {
    setActiveUrl(url);
  };

  const handleBackToInput = () => {
    setActiveUrl(null);
  };

  const handleLogin = (username, password) => {
    const success = username === 'admin' && password === 'apurbo1122';
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }
    return success;
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveUrl(null);
  };

  return (
    <>
      {/* Background ambient glow shapes */}
      <div className="bg-glow-container">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {isLoggedIn ? (
        <>
          {/* Main sticky navbar */}
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onLogoClick={handleBackToInput}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />

          {/* Layout Content wrapper with standard alignment */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Render URL input or custom MediaPlayer depending on active stream url */}
            {!activeUrl ? (
              <div className="transition-layout">
                <Hero onPlayStream={handlePlayStream} />
              </div>
            ) : (
              <div className="transition-layout">
                <MediaPlayer url={activeUrl} onBack={handleBackToInput} />
              </div>
            )}
          </main>

          {/* Minimal clean footer */}
          <Footer />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
